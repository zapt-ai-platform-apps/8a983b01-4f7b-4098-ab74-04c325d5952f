import React, { useState } from 'react';
import ReportView from './components/ReportView';
import ReportForm from './components/ReportForm';
import Header from './components/Header';
import Footer from './components/Footer';
import SavedReportsList from './components/SavedReportsList';
import { useReport } from './hooks/useReport';

function App() {
  const [showForm, setShowForm] = useState(false);
  const {
    report,
    savedReports,
    loading,
    error,
    generateReport,
    saveReport,
    setReport
  } = useReport();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        {report ? (
          <ReportView 
            report={report}
            onSave={saveReport}
            onNew={() => {
              setReport(null);
              setShowForm(false);
            }}
          />
        ) : showForm ? (
          <ReportForm 
            onSubmit={(formData) => {
              generateReport(formData);
              setShowForm(false);
            }}
            loading={loading} 
            error={error}
          />
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Start New Report
              </button>
            </div>
            <SavedReportsList 
              reports={savedReports} 
              onSelect={(selectedReport) => setReport(selectedReport)}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;