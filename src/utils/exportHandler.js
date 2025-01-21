import { createEvent } from '../supabaseClient';

export const handleExport = async (format, report) => {
  try {
    const { response } = await createEvent('chatgpt_request', {
      prompt: `Convert this report to ${format} format. Maintain all data points and legal content. Structure response as plain text. Report data: ${JSON.stringify(report)}`,
      response_type: 'text'
    });
    
    if (!response) {
      throw new Error('Empty response from export service');
    }

    if (format === 'word') {
      const htmlContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
        <head><title>${report.projectName} Safety Report</title></head>
        <body>${response}</body></html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.projectName}_Safety_Report.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      await navigator.clipboard.writeText(response);
    }
  } catch (err) {
    console.error('Export error:', err);
    alert(`Export failed: ${err.message}`);
  }
};