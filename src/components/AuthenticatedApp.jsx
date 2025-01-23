import React, { useState } from 'react';
import ReportView from './ReportView';
import ReportForm from './ReportForm';
import Header from './Header';
import Footer from './Footer';
import SavedReportsList from './SavedReportsList';
import { useReport } from '../hooks/useReport';
import { UserMenu } from './UserMenu';
import { Loading } from './Loading';

const AuthenticatedApp = ({ session }) => {
  const [showForm, setShowForm] = useState(false);
  const {
    report,
    savedReports,
    loading,
    saving,
    error,
    generateReport,
    saveReport,
    setReport
  } = useReport();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Header>
          <UserMenu user={session.user} />
        </Header>
        
        {loading ? (
          <Loading />
        ) : report ? (
          <ReportView 
            report={report}
            onSave={saveReport}
            onNew={() => {
              setReport(null);
              setShowForm(false);
            }}
            saving={saving}
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
              onSelect={(selectedReport) => setReport(JSON.parse(selectedReport.content))}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AuthenticatedApp;