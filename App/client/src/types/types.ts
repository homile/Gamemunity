export interface AuthorType {
  displayName: string;
  uid?: string;
  photoURL: string;
}

export interface PostListType {
  _id: string;
  title: string;
  content: string;
  postNum: number;
  createdAt: Date;
  updatedAt: Date;
  author: AuthorType;
}

export interface PostInfoType {
  _id: string;
  title: string;
  content: string;
  postNum: number | null;
  image: string;
  author: AuthorType;
}

export interface PostEditInfoType {
  id: string;
  title: string;
  content: string;
  postNum: number | null;
}

export interface RepleListType {
  author: AuthorType;
  content: string;
  postId: string;
  reple: string;
  _id: string;
}
