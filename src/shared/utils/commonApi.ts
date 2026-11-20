const BASE_URL = 'http://localhost:8080/approval';

export const checkResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) return response.json();

  try {
    const error = await response.json();
    return Promise.reject(error);
  } catch {
    return Promise.reject(new Error(response.statusText));
  }
};

export { BASE_URL };
