import * as Sentry from '@sentry/browser';
import { generateReportData } from './reportService';
import { supabase } from '../supabaseClient';
import { fetchReportsList, saveReport } from '../api/reportApi';
import { handleSignOut } from '../utils/auth';

export const fetchReportsData = async (setSavedReports, setLoadingReports, setError) => {
  try {
    setLoadingReports(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const data = await fetchReportsList(session.access_token);
    setSavedReports(data);
  } catch (err) {
    handleAuthError(err, setError);
  } finally {
    setLoadingReports(false);
  }
};

export const handleGenerateReport = async (
  formData,
  setReport,
  setError,
  setLoading,
  setSavedReports
) => {
  try {
    setLoading(true);
    setError('');
    const newReport = await generateReportData(formData);
    setReport(newReport);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    await saveReport(session.access_token, newReport.projectName, JSON.stringify(newReport));
    await fetchReportsData(setSavedReports, () => {}, setError);
  } catch (err) {
    handleAuthError(err, setError, 'generate and save report');
  } finally {
    setLoading(false);
  }
};

export const handleSaveReport = async (
  report,
  setError,
  setSaving,
  setSavedReports
) => {
  try {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    await saveReport(session.access_token, report.projectName, JSON.stringify(report));
    await fetchReportsData(setSavedReports, () => {}, setError);
  } catch (err) {
    handleAuthError(err, setError, 'save report');
  } finally {
    setSaving(false);
  }
};

const handleAuthError = (err, setError, action = 'load reports') => {
  if (err.message === 'Unauthorized') {
    handleSignOut();
  } else {
    Sentry.captureException(err);
    console.error(`Failed to ${action}:`, err);
    setError(err.message || `Failed to ${action}`);
  }
};