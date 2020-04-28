import React, { Component } from 'react'
import Book from "./Book"

export default class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          {this.props.shelf ? (
            <div className="row">
              {this.props.shelf
                .map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    bookUpdateSuccessCallback={this.props.bookUpdateSuccessCallback}
                    selectedShelf={book.shelf}
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
    )
  }
}
