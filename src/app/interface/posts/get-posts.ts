export type GetPostsResponse = Post[];

export interface Post {
  id: string;
  body: string;
  title: string;
  tags: string[];
  image: string;
  timeCooking: number;
  author: Author;
  createdOn: string;
  updatedOn: string;
}

export interface Author {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
}
