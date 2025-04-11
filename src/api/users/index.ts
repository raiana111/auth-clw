// src/api/posts/index.ts
import {
  collection,
  addDoc,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { IPost } from '../../types'; // Убедитесь, что путь к types корректен
import { db } from '../../firebase'; // Убедитесь, что путь к firebase корректен

export const createPost = async (post: Omit<IPost, 'id'>) => {
  try {
    const postsCollection = collection(db, 'posts');
    const docRef = await addDoc(postsCollection, post);
    return { ...post, id: docRef.id };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async (userId?: string): Promise<IPost[]> => {
  const postsCollection = collection(db, 'posts');
  let q = query(postsCollection, orderBy('createdAt', 'desc'));
  if (userId) {
    try {
      q = query(postsCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const querySnapShot = await getDocs(q);
      return querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IPost[];
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }
  }
  try {
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IPost[];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
};

export const getPostById = async (postId: string): Promise<IPost | null> => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      return { id: postSnap.id, ...postSnap.data() } as IPost;
    }
    return null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const updatePost = async (postId: string, content: string) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { content, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};