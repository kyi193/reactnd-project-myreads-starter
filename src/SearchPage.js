import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book'
import 'bootstrap/dist//css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      bookList: [],
      shelvedBooks: {},
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.getShelfForBook = this.getShelfForBook.bind(this);

  }

  componentDidMount() {
    this.fetchList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      if (this.state.searchTerm === "" || this.state.searchTerm === undefined || this.state.searchTerm === undefined) {
        return;
      }
      this.fetchBooks();
    }
  }

  updateSearch(event) {
    let term = event.target.value.toLowerCase();
    this.setState({
      searchTerm: term
    });
  }

  fetchBooks() {
    if (this.state.searchTerm !== '' || this.state.searchTerm !== undefined) {
      BooksAPI.search(this.state.searchTerm)
        .then(data => {
          this.setState({
            bookList: (data.error === undefined ? data : [])
          });
        })
    }
  }

  removeBook(book, toShelf) {
    const newShelvedBooks = Object.assign({}, this.state.shelvedBooks);
    if (!newShelvedBooks[book.id]) {
      book.shelf = toShelf;
      newShelvedBooks[book.id] = book;
    } else {
      newShelvedBooks[book.id].shelf = toShelf;
    }
    const filteredBookList = this.state.bookList.filter(books => books.id !== book.id);
    this.setState({
      bookList: filteredBookList,
      shelvedBooks: newShelvedBooks
    });

  }

  fetchList() {
    BooksAPI.getAll()
      .then(books => {
        const shelvedBooks = {}
        for (let i = 0; i < books.length; i++) {
          shelvedBooks[books[i].id] = books[i]
        }
        this.setState({
          shelvedBooks
        });
      })

  }

  getShelfForBook(searchedBook) {
    const shelvedBook = this.state.shelvedBooks[searchedBook.id];
    if (!shelvedBook) {
      return "none";
    }
    return shelvedBook.shelf;
  }

  render() {
    return (
      <React.Fragment>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">
                Close
              </button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type='text'
                placeholder="Search by title or author"
                value={this.state.searchTerm}
                onChange={this.updateSearch}
              />

            </div>
          </div>
        </div>
        {this.state.bookList && this.state.searchTerm ? (
          <div className="row">
            {this.state.bookList.map(book => (
              <Book
                key={book.id}
                book={book}
                bookUpdateSuccessCallback={this.removeBook}
                selectedShelf={this.getShelfForBook(book)}
              />
            ))}
          </div>
        ) : (
            <div>
              <p>Loading Books</p>
            </div>
          )}
      </React.Fragment>
    )
  }
}
