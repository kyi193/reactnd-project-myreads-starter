import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from "./Book"


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
  }

  componentDidMount() {
    this.fetchList();
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                {this.state.shelves.currentlyReading ? (
                  <div className="row">
                    {this.state.shelves.currentlyReading
                      .map(book => (
                        <Book
                          key={book.id}
                          id={book.id}
                          title={book.title}
                          imageUrl={book.imageLinks.thumbnail}
                          fetchList={this.fetchList.bind(this)}
                        />
                      ))}
                  </div>
                ) : (
                    <div>
                      <p>Loading Books</p>
                    </div>
                  )}
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                {this.state.shelves.wantToRead ? (
                  <div className="row">
                    {this.state.shelves.wantToRead
                      .map(book => (
                        <Book
                          key={book.id}
                          id={book.id}
                          title={book.title}
                          imageUrl={book.imageLinks.thumbnail}
                          fetchList={this.fetchList.bind(this)}
                        />
                      ))}
                  </div>
                ) : (
                    <div>
                      <p>Loading Books</p>
                    </div>
                  )}
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                {this.state.shelves.read ? (
                  <div className="row">
                    {this.state.shelves.read
                      .map(book => (
                        <Book
                          key={book.id}
                          id={book.id}
                          title={book.title}
                          imageUrl={book.imageLinks.thumbnail}
                          fetchList={this.fetchList.bind(this)}
                        />
                      ))}
                  </div>
                ) : (
                    <div>
                      <p>Loading Books</p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={this.props.toSearch}>Add a book</button>
        </div>
      </div>
    )
  }
}
