import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import Message from '../Messages/Message';
import './Chat.css';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} user={user} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage(e) : null}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};


export default Chat;