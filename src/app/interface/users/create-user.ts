export interface CreateUserBody {
  username: string;
  password: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  middleName: string;
  isActive: boolean;
}
