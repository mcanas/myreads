import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class App extends Component {
  state = {
    books: new Map(),
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(results => {
      let books = new Map();
      results.forEach(book => books.set(book.id, book));
      this.setState({ books });
    })
  }

  onUpdateBookShelf = (bookToUpdate, newShelf) => {
    let books = this.state.books;
    bookToUpdate.shelf = newShelf;
    books.set(bookToUpdate.id, bookToUpdate);

    this.setState({ books });
    BooksAPI.update(bookToUpdate, newShelf);
  }

  onBookSearch = query => {
    if(query.length) {
      BooksAPI.search(query, 20).then(results => {
        if(results.length) {
          let books = this.state.books;
          let searchResults = results.map(result => {
            return books.has(result.id) ? books.get(result.id) : result;
          });

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
              Array.from(this.state.books.values()).reduce((accum, book) => {
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
