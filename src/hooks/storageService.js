export const saveReports = (reports) => {
  try {
    localStorage.setItem('hns_reports', JSON.stringify(reports));
  } catch (err) {
    throw new Error('LocalStorage save failed: ' + err.message);
  }
};