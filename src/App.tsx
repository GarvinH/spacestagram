import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Nav } from "./containers/Nav/Nav";
import "bootstrap/dist/css/bootstrap.css"

function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
    </div>
  );
}

export default App;
