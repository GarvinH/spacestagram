import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Nav } from "./containers/Nav/Nav";
import "bootstrap/dist/css/bootstrap.css";
import { Home } from "./containers/Home/Home";

function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
