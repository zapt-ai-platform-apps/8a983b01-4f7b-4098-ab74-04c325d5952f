import React, { useState } from 'react';
import ReportView from './ReportView';
import ReportForm from './ReportForm';
import Header from './Header';
import Footer from './Footer';
import SavedReportsList from './SavedReportsList';
import { useReport } from '../hooks/useReport';
import UserMenu from './UserMenu';
import Loading from '../../ui/components/Loading';
import MainLayout from '../../ui/layout/MainLayout';
import Container from '../../ui/layout/Container';
import Card from '../../ui/components/Card';
import EmptyState from '../../ui/feedback/EmptyState';
import Button from '../../ui/components/Button';
import Tabs, { useTabs } from '../../ui/navigation/Tabs';
import { useToastContext } from '../../ui/providers/ToastProvider';

const AuthenticatedApp = ({ session }) => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToastContext();
  const tabs = useTabs('reports');
  
  const {
    report,
    savedReports,
    loading,
    saving,
    error,
    loadingReports,
    generateReport,
    saveReport,
    setReport
  } = useReport();

  const handleSaveReport = async () => {
    try {
      await saveReport();
      toast.success('Report saved successfully!');
    } catch (err) {
      toast.error('Failed to save report: ' + err.message);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    
    if (report) {
      return (
        <ReportView 
          report={report}
          onSave={handleSaveReport}
          onNew={() => {
            setReport(null);
            setShowForm(false);
          }}
          saving={saving}
        />
      );
    }
    
    if (showForm) {
      return (
        <ReportForm 
          onSubmit={(formData) => {
            generateReport(formData);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          loading={loading} 
          error={error}
        />
      );
    }
    
    return (
      <Container maxWidth="lg" className="mt-6">
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          tabs={[
            {
              label: 'My Reports',
              value: 'reports',
              content: (
                <div className="mt-6">
                  <Card padding="normal">
                    <Card.Header>
                      <div className="flex justify-between items-center">
                        <Card.Title>Saved Reports</Card.Title>
                        <Button 
                          variant="primary"
                          onClick={() => setShowForm(true)}
                          startIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          }
                        >
                          New Report
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Content>
                      {loadingReports ? (
                        <div className="py-8">
                          <Loading />
                        </div>
                      ) : savedReports?.length > 0 ? (
                        <SavedReportsList 
                          reports={savedReports} 
                          onSelect={(selectedReport) => {
                            setReport(JSON.parse(selectedReport.content));
                            toast.info(`Loaded report: ${selectedReport.title}`);
                          }}
                        />
                      ) : (
                        <EmptyState
                          title="No reports found"
                          description="Create your first safety report to get started"
                          action={
                            <Button 
                              variant="primary"
                              onClick={() => setShowForm(true)}
                            >
                              Create Report
                            </Button>
                          }
                          icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          }
                        />
                      )}
                    </Card.Content>
                  </Card>
                </div>
              )
            },
            {
              label: 'Dashboard',
              value: 'dashboard',
              content: (
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card padding="normal">
                      <Card.Header>
                        <Card.Title>Reports Created</Card.Title>
                      </Card.Header>
                      <Card.Content>
                        <div className="text-4xl font-bold text-primary-600">{savedReports?.length || 0}</div>
                        <p className="text-gray-500 mt-2">Total safety reports</p>
                      </Card.Content>
                    </Card>
                    <Card padding="normal">
                      <Card.Header>
                        <Card.Title>High Risk Items</Card.Title>
                      </Card.Header>
                      <Card.Content>
                        <div className="text-4xl font-bold text-red-600">
                          {savedReports?.reduce((count, report) => {
                            try {
                              const content = JSON.parse(report.content);
                              return count + (content.risks?.filter(r => r.severity === 'High')?.length || 0);
                            } catch (e) {
                              return count;
                            }
                          }, 0)}
                        </div>
                        <p className="text-gray-500 mt-2">Identified risks requiring attention</p>
                      </Card.Content>
                    </Card>
                    <Card padding="normal">
                      <Card.Header>
                        <Card.Title>Last Created</Card.Title>
                      </Card.Header>
                      <Card.Content>
                        <div className="text-lg font-semibold truncate">
                          {savedReports?.length > 0 
                            ? savedReports[savedReports.length - 1].title 
                            : 'No reports yet'}
                        </div>
                        <p className="text-gray-500 mt-2">
                          {savedReports?.length > 0 
                            ? new Date(savedReports[savedReports.length - 1].createdAt).toLocaleDateString() 
                            : '-'}
                        </p>
                      </Card.Content>
                    </Card>
                  </div>
                  
                  <Card className="mt-6" padding="normal">
                    <Card.Header>
                      <Card.Title>Quick Actions</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Button 
                          variant="outline" 
                          color="primary"
                          isFullWidth
                          onClick={() => setShowForm(true)}
                        >
                          Create New Report
                        </Button>
                        <Button 
                          variant="outline" 
                          color="primary"
                          isFullWidth
                          onClick={() => tabs.onChange('reports')}
                        >
                          View Saved Reports
                        </Button>
                        <Button 
                          variant="outline" 
                          color="primary"
                          isFullWidth
                          onClick={() => window.open('https://www.hse.gov.uk/construction/index.htm', '_blank')}
                        >
                          HSE Guidance
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              )
            }
          ]}
        />
      </Container>
    );
  };

  return (
    <MainLayout
      header={<Header user={session.user} />}
      footer={<Footer />}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default AuthenticatedApp;