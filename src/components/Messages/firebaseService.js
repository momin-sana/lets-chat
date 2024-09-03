import { db } from "../../firebase/firebaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export const updateMessage = async (messageId, newText) => {
  const messageRef = doc(db, "messages", messageId);
  await updateDoc(messageRef, { text: newText });
};

export const deleteMessage = async (messageId) => {
  const messageRef = doc(db, "messages", messageId);
  await deleteDoc(messageRef);
};

// Add more CRUD operations if needed (e.g., createMessage, getMessages, etc.)
