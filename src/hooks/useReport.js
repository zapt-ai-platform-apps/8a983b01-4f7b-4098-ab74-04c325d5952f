import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { generateReportData } from './reportService';
import { supabase } from '../supabaseClient';
import { fetchReportsList, saveReport } from '../api/reportApi';

export function useReport() {
  const [report, setReport] = useState(null);
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingReports, setLoadingReports] = useState(true);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    try {
      setLoadingReports(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const data = await fetchReportsList(session.access_token);
      setSavedReports(data);
    } catch (err) {
      Sentry.captureException(err);
      console.error('Failed to load reports:', err);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerateReport = async (formData) => {
    try {
      setLoading(true);
      setError('');
      const newReport = await generateReportData(formData);
      setReport(newReport);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      await saveReport(session.access_token, newReport.projectName, JSON.stringify(newReport));
      await fetchReports();
    } catch (err) {
      Sentry.captureException(err);
      console.error('Report generation error:', err);
      setError(err.message || 'Failed to generate and save report');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = async () => {
    try {
      setSaving(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      await saveReport(session.access_token, report.projectName, JSON.stringify(report));
      await fetchReports();
    } catch (err) {
      Sentry.captureException(err);
      console.error('Save report error:', err);
      setError('Failed to save report: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    report,
    savedReports,
    loading,
    saving,
    loadingReports,
    error,
    generateReport: handleGenerateReport,
    saveReport: handleSaveReport,
    setReport
  };
}