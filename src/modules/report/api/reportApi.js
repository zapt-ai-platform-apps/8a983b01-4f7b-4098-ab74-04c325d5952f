/**
 * API methods for report operations
 */

/**
 * Fetches the list of saved reports for the current user
 * @param {string} accessToken - The user's auth token
 * @returns {Promise<Array>} - The list of reports
 */
export async function fetchReportsList(accessToken) {
  try {
    console.log('Fetching reports list...');
    
    const response = await fetch('/api/reports/list', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (response.status === 401) {
      console.error('Unauthorized request to fetch reports');
      throw new Error('Unauthorized');
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching reports:', errorText);
      throw new Error(`Failed to fetch reports: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} reports`);
    return data;
  } catch (error) {
    console.error('Error in fetchReportsList:', error);
    throw error;
  }
}

/**
 * Saves a report to the database
 * @param {string} accessToken - The user's auth token
 * @param {string} title - The report title
 * @param {string} content - The stringified report content
 * @returns {Promise<Object>} - The saved report
 */
export async function saveReport(accessToken, title, content) {
  try {
    console.log('Saving report:', title);
    
    const response = await fetch('/api/reports/save', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.status === 401) {
      console.error('Unauthorized request to save report');
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error saving report:', errorText);
      throw new Error(`Failed to save report: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Report saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in saveReport:', error);
    throw error;
  }
}