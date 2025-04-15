import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { IProfile } from '../../types';

export const setUser = async (userId: string, profile: Omit<IProfile, 'id'>) => {
  try {
    await setDoc(doc(db, 'users', userId), profile);
  } catch (error) {
    console.error('Ошибка создания профиля:', error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<IProfile | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as IProfile;
    }
    return null;
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    return null;
  }
};