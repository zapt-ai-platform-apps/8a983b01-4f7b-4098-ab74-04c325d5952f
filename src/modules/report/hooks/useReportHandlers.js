import * as Sentry from '@sentry/browser';
import { generateReportData } from './reportService';
import { supabase } from '../../../supabaseClient';
import { fetchReportsList, saveReport } from '../api/reportApi';

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
    
    // Generate the report
    console.log('Generating report with data:', formData);
    const newReport = await generateReportData(formData);
    console.log('Report generated:', newReport);
    
    setReport(newReport);
    
    // Save the report
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    await saveReport(session.access_token, newReport.projectName, JSON.stringify(newReport));
    console.log('Report saved successfully');
    
    // Refresh reports list
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
    console.log('Report saved successfully');
    
    await fetchReportsData(setSavedReports, () => {}, setError);
  } catch (err) {
    handleAuthError(err, setError, 'save report');
  } finally {
    setSaving(false);
  }
};

const handleAuthError = (err, setError, action = 'load reports') => {
  if (err.message === 'Unauthorized') {
    console.error('Authentication token expired or invalid');
    window.location.reload(); // Force reload to redirect to login
  } else {
    Sentry.captureException(err);
    console.error(`Failed to ${action}:`, err);
    setError(err.message || `Failed to ${action}`);
  }
};