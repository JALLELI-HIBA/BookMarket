import React, { useState } from "react";
import axios from "axios";
import "../AddBook.css"

function AddBook({ changeView, books }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const [bookId, setBookId] = useState(null);

  const handleAddBook = () => {
    if (bookId) {
      axios
        .put(`http://localhost:4000/books/${bookId}`, { title, desc, cover })
        .then((response) => {
          console.log("Book updated successfully:", response.data);
          changeView("Books");
        });
    } else {
      axios
        .post("http://localhost:4000/books", { title, desc, cover })
        .then((response) => {
          console.log("Book added successfully:", response.data);
          changeView("Books");
        });
    }
  };

  const handleSelectBook = (book) => {
    setTitle(book.title);
    setDesc(book.desc);
    setCover(book.cover);
    setBookId(book.id);
  };

  return (
    <div className="add-book">
      <h2 className="add-book__title">Add Book</h2>
      <label className="add-book__label">Title:</label>
      <input
        className="add-book__input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="add-book__label">Description:</label>
      <input
        className="add-book__input"
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <label className="add-book__label">Cover:</label>
      <input
        className="add-book__input"
        type="text"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />
      <button className="add-book__button" onClick={handleAddBook}>
        {bookId ? "Update Book" : "Add Book"}
      </button>
      {books && (
        <div className="add-book__select-books">
          <h3>Select a book to update:</h3>
          <ul className="add-book__book-list">
            {books.map((book) => (
              <li
                className="add-book__book-item"
                key={book.id}
                onClick={() => handleSelectBook(book)}
              >
                {book.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AddBook;
