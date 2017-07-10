import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class App extends Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  onUpdateBookShelf = (bookToUpdate, oldShelf, newShelf) => {
    let books = this.state.books, idx;
    bookToUpdate.shelf = newShelf;
    idx = books.findIndex(book => book.id === bookToUpdate.id);

    if(idx >= 0) {
      books[idx] = bookToUpdate;
    } else {
      books.push(bookToUpdate);
    }

    this.setState({ books });
    BooksAPI.update(bookToUpdate, newShelf);
  }

  onBookSearch = query => {
    if(query.length) {
      BooksAPI.search(query, 20).then(searchResults => {
        if(searchResults.length) {
          this.setState({ searchResults });
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <ListBooks
            onUpdateBookShelf={this.onUpdateBookShelf}
            shelves={
              this.state.books.reduce((accum, book) => {
                if(!accum[book.shelf]) {
                  accum[book.shelf] = [];
                }

                accum[book.shelf].push(book);
                return accum;
              }, {})
            } />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.searchResults}
            onBookSearch={this.onBookSearch}
            onUpdateBookShelf={this.onUpdateBookShelf}
          />
        )}/>
      </div>
    );
  }
}

export default App;
