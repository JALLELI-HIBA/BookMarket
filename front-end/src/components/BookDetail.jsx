import React from "react";
import BookCover from "./BookCover";

const BookDetail = ({ book, changeView }) => {
  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <BookCover cover={book.cover} alt={book.title} />
      <p>
        <strong>Description:</strong> {book.desc}
      </p>
      <button onClick={() => changeView("Books")}>Back to Books</button>
    </div>
  );
};

export default BookDetail;
