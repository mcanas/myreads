import React, { Component } from 'react';
import BookShelf from './BookShelf';

class BookShelves extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shelves: {
        'currentlyReading': [],
        'wantToRead': [],
        'read': []
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let shelves = nextProps.books
      .reduce((accum, book) => {
        if(!accum[book.shelf]) {
          accum[book.shelf] = [];
        }

        accum[book.shelf].push(book);
        return accum;
      }, {});

    this.setState({ shelves });
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state.shelves;
    const { onUpdateBookShelf } = this.props;
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
}

export default BookShelves;
