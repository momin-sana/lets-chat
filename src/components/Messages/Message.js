import React, { useState } from "react";
import { updateMessage, deleteMessage} from "./firebaseService"
import './Message.css';

const Message = ({ message, user, setIsScrolledUp, onReply}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessageText, setNewMessageText] = useState(message.text);
  const [showOptions, setShowOptions] = useState(false);


  const handleUpdateMessage = async () => {
    await updateMessage(message.id, newMessageText);
    setIsEditing(false);
    setIsScrolledUp(false); // Prevent scrolling when a message is updated
  };

  const handleDeleteMessage = async () => {
    await deleteMessage(message.id);
    setIsScrolledUp(false); // Prevent scrolling when a message is updated
  };

 // Trigger reply mode
 const handleReply = () => {
  onReply(message);  // Call the onReply function passed from Chat
};

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isSentByCurrentUser = message.uid === user.uid;

  return (
    <div
      className={`message ${isSentByCurrentUser ? "sent" : "received"}`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <img src={message.photoURL} alt={`${message.displayName}'s avatar`} className="message-avatar" />
      <div className="message-info">
        {/* Show the quoted message when replying */}
        {message.replyingTo && (
          <div className="quoted-message">
            <div className="quoted-header">{message.replyingTo.displayName}</div>
            <div className="quoted-text">{message.replyingTo.text}</div>
          </div>
        )}
    
        <div className="message-header">
          {!isSentByCurrentUser && (
            <span className="message-name">{message.displayName}</span>
          )}
            {isEditing ? (
            <></> // Don't show the text if editing modal is open
          ) : (
            <p className="message-text">{message.text}</p>
          )}
        </div>
        <small className="message-time">{formatTimestamp(message.createdAt)}</small>
        <div className="message-options">
          <button className="options-button">⋮</button>
          {showOptions && (
            <div className="options-dropdown">
              {isSentByCurrentUser ? (
                <>
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                  <button onClick={handleDeleteMessage}>Delete</button>
                  <button onClick={handleReply}>Reply</button>
                </>
              ) : (
                <button onClick={handleReply}>Reply</button>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="modal-background in">
          <div className="modal">
            <h3>Edit Message</h3>
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
            />
            <div className="modal-btn">
              <button onClick={handleUpdateMessage}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Message;
