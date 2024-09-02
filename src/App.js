import React, { useContext } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeContext } from "./ThemeContext";
import "./App.css";

function App() {
  const { mode } = useContext(ThemeContext);

  return (
    <div className={`App ${mode}`}>
      <Header />

      <div className="App-header">
        <h1>Welcome to Let's Chat</h1>
      </div>

      <Footer />
    </div>
  );
}

export default App;
