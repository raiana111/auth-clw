import { collection, addDoc, query, orderBy, where, getDocs } from 'firebase/firestore'
import {IPost} from '../../types'; 
import { db } from '../../firebase'

export const createPost = async (post:Omit<IPost, 'id'>) => {
    const postsCollection = collection(db, 'posts');
    const docRef = await addDoc(postsCollection, post);
    return {...post, id: docRef.id}
}


export const getPosts = async (userId?:string):Promise<IPost[]> => {
    const postsCollection = collection(db, 'posts');
    let q = query(postsCollection, orderBy('createdAt', 'desc'));
    if (userId) {
        try {
          q = query(
            postsCollection,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
          )
          const querySnapShot = await getDocs(q)
          return querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as IPost[];

        }catch(error){
            console.log('error = ', error)
        }
    }
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as IPost[];
    
}