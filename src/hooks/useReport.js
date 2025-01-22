import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { generateReportData } from './reportService';
import { saveReports, loadReports } from './storageService';

export function useReport() {
  const [report, setReport] = useState(null);
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const loaded = loadReports();
      setSavedReports(loaded);
    } catch (err) {
      Sentry.captureException(err);
      console.error('Failed to load reports:', err);
    }
  }, []);

  const handleGenerateReport = async (formData) => {
    try {
      setLoading(true);
      setError('');
      const newReport = await generateReportData(formData);
      setReport(newReport);
      
      setSavedReports(prev => {
        const updated = [...prev, newReport];
        saveReports(updated);
        return updated;
      });
    } catch (err) {
      Sentry.captureException(err);
      console.error('Report generation error:', err);
      setError('Report generation failed: ' + (err.message || 'Invalid response format from AI service'));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = () => {
    try {
      saveReports(savedReports);
      console.log('Reports saved successfully');
    } catch (err) {
      Sentry.captureException(err);
      console.error('Save report error:', err);
      setError('Failed to save report to browser storage');
    }
  };

  return {
    report,
    savedReports,
    loading,
    error,
    generateReport: handleGenerateReport,
    saveReport: handleSaveReport,
    setReport
  };
}