  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import BookCover from "./BookCover";
  import SearchBar from "./SearchBar";
  import BookDetail from "./BookDetail";

  function BooksList({ changeView }) {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
      const fetchAll = async () => {
        try {
          const res = await axios.get("http://localhost:4000/books");
          setBooks(res.data);
        } catch (err) {
          console.log("Error fetching data:", err);
        }
      };
      fetchAll();
    }, []); // Empty dependency array means this effect runs once on mount

    const handleUpdate = async (id, title, desc, cover) => {
      try {
        await axios.put(`http://localhost:4000/books/update/${id}`, {
          title,
          desc,
          cover,
        });
        console.log("Book updated successfully");
        
        // Update the state directly without relying on the response
        setEditingBook(null);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === id ? { ...book, title, desc, cover } : book
          )
        );
        
        // Change the view after updating the state
        changeView("Books");
      } catch (err) {
        console.log("Error updating book:", err);
      }
    };
    

    const handleDeleteBook = async (id) => {
      try {
        await axios.delete(`http://localhost:4000/books/delete/${id}`);
        console.log("Book deleted successfully");
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      } catch (err) {
        console.error("Error deleting book:", err);
      }
    };

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        changeView("Books");
      }, 100); // Adjust the delay as needed
    
      return () => clearTimeout(timeoutId);
    }, [books, changeView]);
    
    const handleSearch = async (query) => {
      setSearchQuery(query);
      try {
        const res = await axios.get(`http://localhost:4000/books/search/${query}`);
        setBooks(res.data);
      } catch (err) {
        console.log("Error searching books:", err);
      }
    };
  
    const handleSelectBook = (book) => {
      setSelectedBook(book);
      changeView("BookDetail"); // Change the view to your BookDetail component
    };

    return (
      <div>
        <img className="big-img"  src="https://conserv.io/wp-content/uploads/2023/07/Book-Storage-and-Humidity-A-Brief-QA.webp" alt="book store"  />
        <SearchBar onSearch={handleSearch} setSearchQuery={setSearchQuery} />
      <div className="book-grid">
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id}>
             <div className="book">
               <BookCover cover={book.cover} alt={book.title} />
                <div className="book-details">
                  <p className="book-title"> <strong>Title:</strong> {book.title}</p>
                  <p className="book-description"><strong>Description:</strong> {book.desc}</p>
                </div>
                 </div>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>

              {editingBook && editingBook.id === book.id ? (
                <>
                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingBook.desc}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, desc: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingBook.cover}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, cover: e.target.value })
                    }
                  />
                  <button
                    onClick={() =>
                      handleUpdate(
                        book.id,
                        editingBook.title,
                        editingBook.desc,
                        editingBook.cover
                      )
                    }
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingBook(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditingBook(book)}>update</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }

  export default BooksList;
