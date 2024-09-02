import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import './Message.css';

const Message = ({ message, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessageText, setNewMessageText] = useState(message.text);
  const [showOptions, setShowOptions] = useState(false);

  const handleUpdateMessage = async () => {
    const messageRef = doc(db, "messages", message.id);
    await updateDoc(messageRef, { text: newMessageText });
    setIsEditing(false);
  };

  const handleDeleteMessage = async () => {
    const messageRef = doc(db, "messages", message.id);
    await deleteDoc(messageRef);
  };

  const handleReply = () => {
    // Logic to reply to a message
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

    const isSentByCurrentUser = message.uid === user.uid;

  return (
    <div className={`message ${isSentByCurrentUser ? "sent" : "received"}`}>
      <img src={message.photoURL} alt={`${message.displayName}'s avatar`} className="message-avatar" />
      <div className="message-info">
        <div className="message-header">
          <span className="message-name">{message.displayName}</span>
          {isEditing ? (
            <>
                <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                />
                <button onClick={handleUpdateMessage}>Save</button>
            </>
          ) : (
            <p className="message-text">{message.text}</p>
          )}
        </div>
        <small className="message-time">{formatTimestamp(message.createdAt)}</small>
        {isSentByCurrentUser && (
          <div className="message-options">
            <button onClick={() => setShowOptions(!showOptions)}>⋮</button>
            {showOptions && (
              <div className="options-dropdown">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDeleteMessage}>Delete</button>
                <button onClick={handleReply}>Reply</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
