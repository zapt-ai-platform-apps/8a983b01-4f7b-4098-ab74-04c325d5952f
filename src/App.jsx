import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase } from './supabaseClient';
import ReportView from './components/ReportView';
import ReportForm from './components/ReportForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [report, setReport] = useState(null);
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReport = async (formData) => {
    try {
      setLoading(true);
      setError('');
      
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
      setError('Failed to generate report. Please try again.');
      console.error('Report generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveReport = () => {
    try {
      localStorage.setItem('hns_reports', JSON.stringify(savedReports));
    } catch (err) {
      Sentry.captureException(err);
      console.error('Save report error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        {!report ? (
          <ReportForm 
            onSubmit={generateReport} 
            loading={loading} 
            error={error}
          />
        ) : (
          <ReportView 
            report={report}
            onSave={saveReport}
            onNew={() => setReport(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;