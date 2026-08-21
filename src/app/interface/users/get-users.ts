interface User {
  username: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  createdOn: string; // date
  updatedOn: string; // date
  lastEntry: string; // date
  isActive: boolean;
  id: string;
}

export type Users = User[];
