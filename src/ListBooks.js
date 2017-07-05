import React from 'react';
import { Link } from 'react-router-dom';
import BookShelves from './BookShelves';

const ListBooks = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelves
          shelves={props.shelves}
          onUpdateBookShelf={props.onUpdateBookShelf} />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;
