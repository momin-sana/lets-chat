# Let's Chat - A Real-Time Chat Application

## Overview

**Let's Chat** is a real-time chat application built using **React**, **Firebase Authentication**, and **Firestore** as the database. Users can authenticate via Google sign-in, send and reply to messages in a real-time chat interface, and manage their own messages, including editing, replying, and deleting messages. The app also supports clearing all chat messages with confirmation.

## Features

1. **Google Authentication**: Users can log in and log out using Google sign-in.
2. **Real-Time Messaging**: Messages are updated in real-time for all connected users.
3. **Reply to Messages**: Users can reply to specific messages, with quoted replies displayed in the chat.
4. **Message Editing**: Users can edit their own messages.
5. **Message Deletion**: Users can delete their own messages.
6. **Clear All Chat**: Users can clear all messages with a confirmation prompt.
7. **Scroll to Bottom**: Users can quickly scroll to the latest messages if they have scrolled up.
8. **Responsive Design**: The app is mobile-friendly and works across all screen sizes.

## Technologies Used

- **React**: For building the user interface and managing application state.
- **Firebase Authentication**: For user authentication using Google Sign-In.
- **Firestore**: A real-time NoSQL database for storing chat messages.
- **React Context**: For managing theme settings (dark/light mode).
- **CSS**: For styling the app components.

## Project Structure

```
├── src
│   ├── components
│   │   ├── Chat
│   │   │   ├── Chat.js         # Chat component managing real-time messaging
│   │   ├── Header
│   │   │   └── Header.js       # Header component with user info and logout button
│   │   ├── Footer
│   │   │   └── Footer.js       # Footer component
│   │   ├── Messages
│   │   │   └── Message.js      # Message component handling individual messages
│   ├── firebase
│   │   └── firebaseConfig.js   # Firebase configuration and initialization
│   ├── App.js                  # Main app component handling user authentication
│   ├── MaterialUISwitch.js     # Context API to manage dark/light mode
│   └── App.css                 # Global CSS styling
```

## Usage

### Authentication

- When the app loads, users will see a **Sign in with Google** button.
- After logging in, they will be redirected to the chat interface.

### Messaging

- Users can send new messages using the message input field.
- They can also reply to specific messages by clicking on the **Reply** option.
- If a user scrolls up, a **scroll down** button appears to allow them to return to the latest messages.

### Message Management

- Users can edit or delete their own messages by clicking the **⋮ (options)** button next to their messages.
- To clear the chat, users can click the **clear chat button** (🗑) in the chat header. This action is irreversible and removes all messages from the Firestore collection.

## Available Scripts

In the project directory, you can run the following commands:

### `npm start`

Runs the app in development mode on `http://localhost:3000`.

### `npm run build`

Builds the app for production to the `build` folder.

## Customization

1. **Theme Customization**: The app supports dark/light themes using the `Material UI Swtich`. You can customize the theme settings in `MaterialUISwitch.js`.
2. **Firebase Services**: Additional Firebase services can be easily added by extending the existing Firebase setup in `firebaseConfig.js`.

## Future Improvements

- Add direct messaging between users.
- Implement message reactions.
- Improve error handling and form validation.


---

Enjoy using **Let's Chat**! Feel free to contribute or raise issues if you have suggestions or find bugs.

