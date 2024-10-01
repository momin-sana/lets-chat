import React, { useState, useEffect, useRef,useLayoutEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import Message from '../Messages/Message';
import './Chat.css';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null); // Create a ref for the messages container
  const messagesContainerRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false); // State to track scroll position
  const [replyingTo, setReplyingTo] = useState(null); // State to track which message is being replied to
  const [clearMessage, setClearMessage] = useState(""); // State to handle chat clear feedback



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

  // Use useLayoutEffect to scroll to the bottom immediately after messages update
  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      // Check if the user has scrolled up
      if (scrollHeight - scrollTop > clientHeight) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setIsScrolledUp(false); // Reset the scroll state
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const handleSendMessage = async (messageText) => {
    if (messageText.trim()) {
      const message = {
        text: messageText,
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        replyingTo: replyingTo ? { displayName: replyingTo.displayName, text: replyingTo.text } : null, // Attach replyingTo
      };
      await addDoc(collection(db, "messages"), message);
      setNewMessage(""); // Reset the new message state
      setReplyingTo(null); // Reset replyingTo after sending
    }
  };

  const handleReply = (message) => {
    setReplyingTo(message); // Set the message being replied to
  };

  // Function to clear all messages with a confirmation dialog
  const handleClearChat = async () => {
    const confirmation = window.confirm("Are you sure you want to clear all messages? This action cannot be undone.");
    if (confirmation) {
      const messageCollection = collection(db, "messages");
      const messagesSnapshot = await getDocs(messageCollection);
      const batchPromises = messagesSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(batchPromises);

      // Show "Chat cleared" message after deletion
      setClearMessage("Chat cleared");
      setTimeout(() => setClearMessage(""), 3000); // Clear the message after 3 seconds
    }
  };


  return (
    <div className="chat-container">
       <div className="chat-header">
        {/* Clear Chat Button */}
        <button className="clear-chat-button" onClick={handleClearChat}>
          🗑
        </button>
      </div>
      {clearMessage && <div className="clear-chat-message">{clearMessage}</div>}

      <div className="messages"
        ref={messagesContainerRef}
        onScroll={handleScroll} 
      >
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            user={user} 
            setIsScrolledUp={setIsScrolledUp} 
            onReply={handleReply} // Pass the reply handler to Message
        />
        ))}
         <div ref={messagesEndRef} />
      </div>
      {isScrolledUp && (
        <button className="scroll-down-button" onClick={scrollToBottom}>
          ⬇
        </button>
      )}

      {/* Conditionally render the reply input field or the normal input field */}
      {replyingTo ? (
        <>
        
          {/* Cancel button to exit reply mode */}
          <button
          type="button"
          className="cancel-reply-button"
          onClick={() => setReplyingTo(null)}  // Exit reply mode when clicked
          >
          ✖
          </button>

          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(newMessage); }} className="reply-input">
              <div className="quoted-message" >
                <div className="quoted-header">{replyingTo.displayName}</div>
                <div className="quoted-text" >{replyingTo.text}</div>
              </div>
            <div className="reply-input-text-button">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent the default form submission on Enter
                    handleSendMessage(newMessage); // Send message only once
                  }
                }}              
              />
            <button type="submit">Reply</button>
            </div>
          </form>
        </>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(newMessage); }} className="send-message">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default form submission on Enter
                handleSendMessage(newMessage); // Send message only once
              }
            }}
          />
          <button type="submit">Send</button>
        </form>
        
      )}
    </div>
  );
};

export default Chat;