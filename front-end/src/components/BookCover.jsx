import React from "react";

const BookCover = ({ cover, alt }) => {
  return (
    <img
      src={cover}
      alt={alt}
      style={{
        width: "150px",
        height: "200px",
        objectFit: "cover",
        borderRadius: "5px",
        marginRight: "10px",
        
      }}
    />
  );
};

export default BookCover;