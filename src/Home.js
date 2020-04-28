import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from "./Book"
import Bookshelf from "./Bookshelf"


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shelves: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      },
    }

    this.fetchList = this.fetchList.bind(this)
    this.transferBook = this.transferBook.bind(this)
  }

  componentDidMount() {
    this.fetchList();
  }

  transferBook(book, toShelfName) {
    const fromShelfName = book.shelf;
    const fromShelf = this.state.shelves[fromShelfName];
    const toShelf = this.state.shelves[toShelfName];
    const filteredFromShelf = fromShelf.filter(filteredBook => filteredBook.title !== book.title)
    const unusedShelfName = Object.keys(this.state.shelves)
      .filter(filteredShelf => ![fromShelfName, toShelfName].includes(filteredShelf)).toString();
    const unusedShelf = this.state.shelves[unusedShelfName];
    book.shelf = toShelfName;
    this.setState({
      shelves: {
        [fromShelfName]: filteredFromShelf,
        [toShelfName]: [...toShelf, book],
        [unusedShelfName]: unusedShelf,
      }
    })
  }


  fetchList() {
    const [currentlyReading, wantToRead, read] = [[], [], []];
    BooksAPI.getAll()
      .then(books => {
        for (let i = 0; i < books.length; i++) {
          if (books[i].shelf === "currentlyReading") {
            currentlyReading.push(books[i]);
          } else if (books[i].shelf === "wantToRead") {
            wantToRead.push(books[i]);
          } else if (books[i].shelf === "read") {
            read.push(books[i]);
          }
        }
        this.setState({
          shelves: {
            currentlyReading,
            wantToRead,
            read
          }
        })
      })

  }


  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              shelfName="Currently Reading"
              shelf={this.state.shelves.currentlyReading}
              bookUpdateSuccessCallback={this.transferBook}
            />
            <Bookshelf
              shelfName="Want To Read"
              shelf={this.state.shelves.wantToRead}
              bookUpdateSuccessCallback={this.transferBook}
            />
            <Bookshelf
              shelfName="Read"
              shelf={this.state.shelves.read}
              bookUpdateSuccessCallback={this.transferBook}
            />
          </div>
        </div>
        <div className="open-search">
          <button onClick={this.props.toSearch}>Add a book</button>
        </div>
      </div>
    )
  }
}
