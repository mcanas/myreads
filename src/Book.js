import React from 'react';

const Book = props => {
  if(!props.book) return null;
  const { authors, title, imageLinks, shelf } = props.book;
  const { book, onUpdateBookShelf } = props;

  let image = imageLinks ?
    imageLinks.thumbnail :
    'https://books.google.com/googlebooks/images/no_cover_thumb.gif';

  const bookCoverStyle = {
    width: '128px',
    height: '188px',
    backgroundImage: `url("${image}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={bookCoverStyle}></div>
        <div className="book-shelf-changer">
          <select
            value={shelf}
            onChange={e => onUpdateBookShelf(book, shelf, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(', ')}</div>
    </div>
  );
}

export default Book;
