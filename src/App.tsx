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
      <footer>
        <small>
          Brought to you by NASA's Astronomy Photo of the Day (APOD) API
        </small>
      </footer>
    </div>
  );
}

export default App;
