import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class SearchBooks extends Component {
  state = {
    books: []
  }

  onBookSearch = query => {
    if(query.length) {
      BooksAPI.search(query, 20).then(books => {
        if(books.length) {
          this.setState({ books });
        }
      });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.onBookSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
            title="Results"
            books={this.state.books}
            onUpdateBookShelf={this.props.onUpdateBookShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
