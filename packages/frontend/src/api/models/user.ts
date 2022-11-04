export interface User {
  id: string;
  created_at: Date;
  email: string | null;
  token: string;
  role: 'User' | 'Moderator' | 'Admin';
}
