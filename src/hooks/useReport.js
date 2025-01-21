import { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { createEvent } from '../supabaseClient';

export function useReport() {
  const [report, setReport] = useState(null);
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReport = async (formData) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Starting report generation with data:', formData);
      
      const [synopsisRes, risksRes, methodRes] = await Promise.all([
        createEvent('chatgpt_request', {
          prompt: `Generate UK health and safety legislation synopsis for: ${formData.projectDescription}. Structure as {synopsis: string, obligations: string[]}`,
          response_type: 'json'
        }),
        createEvent('chatgpt_request', {
          prompt: `Create risk assessment table for: ${formData.identifiedRisks}. Structure as {risks: {risk: string, mitigation: string}[]}`,
          response_type: 'json'
        }),
        createEvent('chatgpt_request', {
          prompt: `Create method statement for: ${formData.projectSteps}. Structure as {methodStatement: string[]}`,
          response_type: 'json'
        })
      ]);

      console.log('AI responses received:', { synopsisRes, risksRes, methodRes });

      const newReport = {
        ...formData,
        generatedAt: new Date().toISOString(),
        legislation: synopsisRes.response,
        risks: risksRes.response.risks,
        methodStatement: methodRes.response.methodStatement
      };

      setReport(newReport);
      setSavedReports([...savedReports, newReport]);
    } catch (err) {
      Sentry.captureException(err);
      console.error('Report generation error:', err);
      setError('Failed to generate report. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveReport = () => {
    try {
      localStorage.setItem('hns_reports', JSON.stringify(savedReports));
      console.log('Reports saved to localStorage');
    } catch (err) {
      Sentry.captureException(err);
      console.error('Save report error:', err);
    }
  };

  return {
    report,
    savedReports,
    loading,
    error,
    generateReport,
    saveReport,
    setReport
  };
}