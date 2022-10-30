import { session } from "../store/session";

const API_ENDPOINT = 'http://localhost:3000/v1/';

const $handle = async (res: Response) => {
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

const $fetchQuery = (endpoint: string, query: Record<string, unknown>, method: string): Promise<any> => {
  const q = Object.entries(query).filter(([_, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
  const url = API_ENDPOINT + endpoint + (q ? '?' + q : '');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (session.token) {
    headers['Authorization'] = `Bearer ${session.token}`;
  }
  return fetch(url, {
    method,
    headers,
  }).then($handle);
};

const $fetchBody = (endpoint: string, body: Record<string, unknown>, method: string): Promise<any> => {
  const bodyJson = JSON.stringify(body);
  const url = API_ENDPOINT + endpoint;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (session.token) {
    headers['Authorization'] = `Bearer ${session.token}`;
  }
  return fetch(url, {
    method,
    headers,
    body: bodyJson,
  }).then($handle);
};

export const $get = <T = unknown>(endpoint: string, query: Record<string, unknown> = {}): Promise<T> => $fetchQuery(endpoint, query, 'GET');
export const $post = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'POST');
export const $delete = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'DELETE');
export const $put = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'PUT');
