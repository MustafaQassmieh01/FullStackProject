export async function parseResponse(response, { raw = false } = {}) {
  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const msg = (json && json.message) || response.statusText || 'Request failed';
    const err = new Error(msg);
    err.status = response.status;
    err.payload = json;
    throw err;
  }
  // server uses { success: boolean, data, message }
  if (json && json.success === false) {
    const err = new Error(json.message || 'API error');
    err.payload = json;
    throw err;
  }
  return raw ? json : (json ? json.data : null);
}
