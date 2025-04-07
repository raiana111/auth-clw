export interface IUser {
    email: string | null;
    id: string;
  }
  
export interface IPost {
    id: string;
    content: string;
    userId: string;
    createdAt: string;
    email: string
  }