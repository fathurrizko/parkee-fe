const BASE_URL = "http://localhost:9001/api"; // change only here if URL changes

export async function doFetch(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(endpoint: string, requestBody: any) {
const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: JSON.stringify(requestBody)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json();
}
