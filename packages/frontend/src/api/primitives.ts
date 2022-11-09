import { API_ENDPOINT as ENV_API_ENDPOINT } from '../global-const';
import { session } from '../store/session';

const API_ENDPOINT = ENV_API_ENDPOINT + '/v1/';

const $handle = async (res: Response) => {
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

const $fetchQuery = (endpoint: string, query: Record<string, unknown>, method: string): Promise<unknown> => {
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

const $fetchBody = (endpoint: string, body: Record<string, unknown>, method: string): Promise<unknown> => {
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

export const $get = <T = unknown>(endpoint: string, query: Record<string, unknown> = {}): Promise<T> => $fetchQuery(endpoint, query, 'GET') as Promise<T>;
export const $post = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'POST') as Promise<T>;
export const $delete = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'DELETE') as Promise<T>;
export const $put = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'PUT') as Promise<T>;
