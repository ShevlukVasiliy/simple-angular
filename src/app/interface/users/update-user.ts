export interface UpdateUserBody {
  username: string;
  password: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  middleName: string;
  isActive: boolean;
}
