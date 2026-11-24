const BASE_URL = 'http://localhost:8080/approval';

const COMMON_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json'
};

const buildUrl = (
  base: string,
  params: Record<string, string | number>
): string => {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url.toString();
};

const buildOptions = (method: string, body?: object): RequestInit => ({
  method,
  headers: COMMON_HEADERS,
  ...(body !== undefined && { body: JSON.stringify(body) })
});

const checkResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) return response.json();

  try {
    const error = await response.json();
    return Promise.reject(error);
  } catch {
    return Promise.reject(new Error(response.statusText));
  }
};

export { BASE_URL, buildUrl, buildOptions, checkResponse };
