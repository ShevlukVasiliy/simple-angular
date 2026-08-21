interface Post {
  id: string;
  body: string;
  title: string;
  createdOn: string; // date
  updatedOn: string; // date
}

interface Comment {
  id: string;
  postId: string;
  text: string;
  createdOn: string; // date
  updatedOn: string; // date
}

export interface User {
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
  posts: Post[];
  comments: Comment[];
}
