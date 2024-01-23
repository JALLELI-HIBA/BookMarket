
import React, { useState } from "react";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
import Quotes from "./components/Quotes";
import Footer from "./components/Footer.jsx";
import logo from '../src/logo/logo.png'
import './footer.css'; 

function App() {
 const [view, setView] = useState("Books");

 const changeView = (newView) => {
    setView(newView);
 };

 return (
    <div className="App">
      <nav>
        <img className="logo" src={logo}/>
        <button onClick={() => changeView("Books")}>Books</button>
        <button onClick={() => changeView("AddBook")}>Add Book</button>
        <button onClick={() => changeView("Quotes")}>Quotes</button>
      </nav>
      <div>
        {view === "Books" && <BooksList changeView={changeView} />}
        {view === "AddBook" && <AddBook changeView={changeView} />}
        {view === "Quotes" && <Quotes changeView={changeView} />}
        <Footer />
      </div>
    </div>
 );
}

export default App;
