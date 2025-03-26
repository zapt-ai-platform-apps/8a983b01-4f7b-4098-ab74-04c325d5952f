import { useState, useEffect } from 'react';
import { fetchReportsData, handleGenerateReport, handleSaveReport } from './useReportHandlers';

export function useReport() {
  const [report, setReport] = useState(null);
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingReports, setLoadingReports] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReportsData(setSavedReports, setLoadingReports, setError);
  }, []);

  const generateReport = async (formData) => {
    await handleGenerateReport(
      formData,
      setReport,
      setError,
      setLoading,
      setSavedReports
    );
  };

  const saveReport = async () => {
    await handleSaveReport(
      report,
      setError,
      setSaving,
      setSavedReports
    );
  };

  return {
    report,
    savedReports,
    loading,
    saving,
    loadingReports,
    error,
    generateReport,
    saveReport,
    setReport
  };
}