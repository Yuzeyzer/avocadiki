import { firestore } from '../firebase/config';
import { doc, setDoc, Timestamp, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { user } from './getUser';

const useDoc = () => {
  const getDocument = async (collectionName: string, id: string) => {
    const document = ref<any>(null);

    const unsub = onSnapshot(doc(firestore, collectionName, id), (doc) => {
      document.value = { ...doc.data(), id: doc.id };
    });

    onUnmounted(() => {
      unsub();
    });

    return { document };
  };

  const addNewMessageToCollection = async (newData: any, collectionName: string, id: string) => {
    const messagesDoc = doc(firestore, collectionName, id);

    const messages = await getDoc(messagesDoc);

    const newMessage = {
      id: uuidv4(),
      author: user.value?.displayName,
      authorId: user.value?.uid,
      text: newData,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      if (messages.data()?.message?.length > 0) {
        await updateDoc(messagesDoc, {
          message: [...messages.data()?.message, newMessage],
        });
      }
      else {
        await setDoc(messagesDoc, {
          message: [newMessage]
        })
      }

      return newMessage;
    } catch (err: any) {
      return err.message;
    }
  };
  const uploadImageInMessage = async (newImageUrl: any, documentId: string, messageId: string) => {
    const messagesDoc = doc(firestore, 'messages', documentId);

    const messages = await getDoc(messagesDoc);

    const oldMessages = messages.data()?.message;

    const newDataToAdd = {
      id: messageId,
      author: user.value?.displayName,
      authorId: user.value?.uid,
      text: '',
      createdAt: Timestamp.fromDate(new Date()),
      images: [newImageUrl],
    };

    await updateDoc(messagesDoc, {
      message: [...oldMessages, newDataToAdd],
    });
  };

  return { addNewMessageToCollection, getDocument, uploadImageInMessage };
};

export default useDoc;
