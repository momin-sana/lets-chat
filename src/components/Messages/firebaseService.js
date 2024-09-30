import { db } from "../../firebase/firebaseConfig";
import { doc, updateDoc, deleteDoc, addDoc, collection } from "firebase/firestore";

export const updateMessage = async (messageId, newText) => {
  const messageRef = doc(db, "messages", messageId);
  await updateDoc(messageRef, { text: newText });
};

export const deleteMessage = async (messageId) => {
  const messageRef = doc(db, "messages", messageId);
  await deleteDoc(messageRef);
};

// Function to add a new message
export const addMessage = async (message) => {
  try {
    await addDoc(collection(db, "messages"), message);
  } catch (error) {
    console.error("Error adding message: ", error);
  }
};

// Add more CRUD operations if needed (e.g., createMessage, getMessages, etc.)
