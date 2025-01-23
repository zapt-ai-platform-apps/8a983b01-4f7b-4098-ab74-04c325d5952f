export async function fetchReportsList(accessToken) {
  const response = await fetch('/api/reports/list', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (response.status === 401) {
    throw new Error('Unauthorized');
  }
  
  if (!response.ok) throw new Error('Failed to fetch reports');
  
  return await response.json();
}

export async function saveReport(accessToken, title, content) {
  const response = await fetch('/api/reports/save', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!response.ok) throw new Error('Failed to save report');
}