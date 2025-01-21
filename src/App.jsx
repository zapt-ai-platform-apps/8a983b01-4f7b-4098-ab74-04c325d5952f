import React from 'react';
import ReportView from './components/ReportView';
import ReportForm from './components/ReportForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { useReport } from './hooks/useReport';

function App() {
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