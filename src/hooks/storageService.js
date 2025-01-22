export const saveReports = (reports) => {
  try {
    localStorage.setItem('hns_reports', JSON.stringify(reports));
  } catch (err) {
    throw new Error('LocalStorage save failed: ' + err.message);
  }
};

export const loadReports = () => {
  try {
    const data = localStorage.getItem('hns_reports');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load reports:', err);
    return [];
  }
};