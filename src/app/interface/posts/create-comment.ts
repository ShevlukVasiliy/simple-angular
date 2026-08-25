export interface CreateCommentBody {
  text: string;
}

export interface CreateCommentResponse {
  id: string;
  userId: string;
  postId: string;
  text: string;
  createdOn: string;
  updatedOn: string;
}
