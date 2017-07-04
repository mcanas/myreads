import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelves from './BookShelves';
import './App.css';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    })
  }

  onUpdateBookShelf = (bookToUpdate, shelf) => {
    let books = this.state.books;
    books.forEach(book => {
      if(book.id === bookToUpdate.id) {
        book.shelf = shelf;
      }
    });

    this.setState({ books });

    BooksAPI.update(bookToUpdate, shelf);
  }

  render() {
    return (
      <div className="App">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelves
            books={this.state.books}
            onUpdateBookShelf={this.onUpdateBookShelf} />
        </div>
      </div>
    );
  }
}

export default App;
