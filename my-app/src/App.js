// import React from "react";
// import logo from './logo.svg';
import './App.css';

function App() {
  const componentDidMount = () => {
    const script = document.createElement("script");
    script.src = "/app/startup/main.js";
    script.async = true;
    document.body.appendChild(script);
  }

  return (
      componentDidMount()
  );
}

export default App;
