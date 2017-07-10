import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class App extends Component {
  state = {
    shelves: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let shelves = books
        .reduce((accum, book) => {
          if(!accum[book.shelf]) {
            accum[book.shelf] = [];
          }

          accum[book.shelf].push(book);
          return accum;
        }, {});

      this.setState({ shelves });
    })
  }

  onUpdateBookShelf = (bookToUpdate, oldShelf, newShelf) => {
    let shelves = this.state.shelves;

    if(oldShelf !== 'none') {
      let index = shelves[oldShelf].findIndex(b => b.id === bookToUpdate);
      let book = shelves[oldShelf].splice(index, 1)[0];
      book.shelf = newShelf;

      if(newShelf !== 'none') {
        shelves[newShelf].push(book);        
      }
    }

    this.setState({ shelves });
    BooksAPI.update(bookToUpdate, newShelf);
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <ListBooks
            onUpdateBookShelf={this.onUpdateBookShelf}
            shelves={this.state.shelves} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            onUpdateBookShelf={this.onUpdateBookShelf}
          />
        )}/>
      </div>
    );
  }
}

export default App;
