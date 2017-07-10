import React from 'react';
import BookShelf from './BookShelf';

const BookShelves = props => {
  const { currentlyReading, wantToRead, read } = props.shelves;
  const { onUpdateBookShelf } = props;

  return (
    <div>
      <BookShelf
        title="Currently Reading"
        books={currentlyReading}
        onUpdateBookShelf={onUpdateBookShelf} />
      <BookShelf
        title="Want To Read"
        books={wantToRead}
        onUpdateBookShelf={onUpdateBookShelf} />
      <BookShelf
        title="Read"
        books={read}
        onUpdateBookShelf={onUpdateBookShelf} />
    </div>
  );
}

export default BookShelves;
