import { CreatePostParam } from "./params/create-post";
import { session } from "../store/session";
import { Post } from "./models/post";
import { User } from "./models/user";

const API_ENDPOINT = 'http://localhost:3000/v1/';

export const $get = <T = unknown>(endpoint: string, query: Record<string, unknown> = {}): Promise<T> => {
  const q = Object.entries(query).map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
  const url = API_ENDPOINT + endpoint + (q ? '?' + q : '');
  const headers: HeadersInit = session.token ? {
    'Authorization': `Bearer ${session.token}`,
  } : {};
  return fetch(url, {headers}).then(res => res.json());
};

export const $post = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => {
  const bodyJson = JSON.stringify(body);
  const url = API_ENDPOINT + endpoint;
  const headers: HeadersInit = session.token ? {
    'Authorization': `Bearer ${session.token}`,
  } : {};
  return fetch(url, {
    headers,
    method: 'POST',
    body: bodyJson,
  }).then(res => res.json());
};


export const $delete = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => {
  const bodyJson = JSON.stringify(body);
  const url = API_ENDPOINT + endpoint;
  const headers: HeadersInit = session.token ? {
    'Authorization': `Bearer ${session.token}`,
  } : {};
  return fetch(url, {
    headers,
    method: 'DELETE',
    body: bodyJson,
  }).then(res => res.json());
};


export const $put = (endpoint: string, body: Record<string, unknown> = {}) => {
  const bodyJson = JSON.stringify(body);
  const url = API_ENDPOINT + endpoint;
  const headers: HeadersInit = session.token ? {
    'Authorization': `Bearer ${session.token}`,
  } : {};
  return fetch(url, {
    headers,
    method: 'PUT',
    body: bodyJson,
  }).then(res => res.json());
};

export const api = {
  session: {
    getAsync: () => $get<User>('session'),

    startAsync: () => $post<User>('session/start'),
    
    loginAsync: (email: string, password: string) => $post<User>('session/login', {
      email, password,
    }),
    
    signupAsync: (email: string, password: string) => $post<User>('session/signup', {
      email, password,
    }),
  },

  post: {
    getAsync: (id: string) => $get<Post>(`post/${id}`),
    getChannelPostsAsync: (channel: string) => $get<Post>(`post/channel/${channel}`),
    createAsync: (args: CreatePostParam) => $post<Post>('post', args),
    deleteAsync: (id: string) => $delete<Post>(`post/${id}`),
  },
};
