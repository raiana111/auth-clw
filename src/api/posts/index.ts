import { collection, query, orderBy, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { IPost } from '../../types';
import { db } from '../../firebase';

export const createPost = async (post: Omit<IPost, 'id'>) => {
  try {
    const postsCollection = collection(db, 'posts');
    const docRef = await addDoc(postsCollection, post);
    return { ...post, id: docRef.id };
  } catch (error) {
    console.error('Ошибка создания поста:', error);
    throw error;
  }
};

export const getPosts = async (): Promise<IPost[]> => {
  const postsCollection = collection(db, 'posts');
  const q = query(postsCollection, orderBy('createdAt', 'desc'));
  try {
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IPost[];
  } catch (error) {
    console.error('Ошибка получения всех постов:', error);
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
    console.error('Ошибка получения поста:', error);
    return null;
  }
};