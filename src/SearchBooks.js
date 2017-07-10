import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const SearchBooks = props => {
  const { books, onUpdateBookShelf, onBookSearch } = props;

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={e => onBookSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookShelf
          title="Results"
          books={books}
          onUpdateBookShelf={onUpdateBookShelf}
        />
      </div>
    </div>
  );
}

export default SearchBooks;
