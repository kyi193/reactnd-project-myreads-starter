import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from "./Book"
import "bootstrap/dist//css/bootstrap.min.css";
import { Link } from 'react-router-dom';
let allTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
]

export default class SearchPage extends Component {
  constructor(props) {
    super(props)

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
          })
        })
    }
  }

  removeBook(book, toShelf) {

    const newShelvedBooks = Object.assign({}, this.state.shelvedBooks)
    if (!newShelvedBooks[book.id]) {
      book.shelf = toShelf;
      newShelvedBooks[book.id] = book
    } else {
      newShelvedBooks[book.id].shelf = toShelf;
    }
    const filteredBookList = this.state.bookList.filter(books => books.id !== book.id)
    this.setState({
      bookList: filteredBookList,
      shelvedBooks: newShelvedBooks
    })

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
        })
      })

  }

  getShelfForBook(searchedBook) {
    const shelvedBook = this.state.shelvedBooks[searchedBook.id]
    if (!shelvedBook) {
      return "none"
    }
    return shelvedBook.shelf
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

{/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
