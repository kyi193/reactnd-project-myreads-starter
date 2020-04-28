import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

const shelves = [
  { id: 1, prettyShelf: "None", shelf: "none" },
  { id: 2, prettyShelf: "Currently Reading", shelf: "currentlyReading" },
  { id: 3, prettyShelf: "Want to Read", shelf: "wantToRead" },
  { id: 4, prettyShelf: "Read", shelf: "read" }
];

export default class Book extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      imageUrl: '',
      imageLoading: true,
      tooManyRequests: false,
    }

    this.updateList = this.updateList.bind(this);
    this.handleShelfSelect = this.handleShelfSelect.bind(this);
  }

  componentDidMount() {
    const { id, title, shelf, imageLinks } = this.props.book;
    const imageUrl = imageLinks !== undefined ? imageLinks.thumbnail : "https://via.placeholder.com/120x150"

    this.setState({
      id,
      title,
      imageUrl,
      shelf
    });
  }

  updateList = shelf => {
    const book = {
      id: this.state.id,
      title: this.state.title,
      imageUrl: this.state.imageUrl,
    }
    BooksAPI.update(book, shelf)
      .then(() => {
        if (this.props.bookUpdateSuccessCallback) {
          this.props.bookUpdateSuccessCallback(this.props.book, shelf);
        }
      })

  }

  handleShelfSelect = e => {
    if (e.target.value !== "none") {
      e.persist();
      if (e.target.value === "currentlyReading") {
        this.updateList("currentlyReading")
      }
      else if (e.target.value === "wantToRead") {
        this.updateList("wantToRead")
      }
      else if (e.target.value === "read") {
        this.updateList("read")
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-2 col-sm-1 mb-0">
          <img
            src={this.state.imageUrl}
            style={{ width: '12em', height: '15em' }}
            className="card-img-top rounded mx-auto d-block mt-2"
          />
          <div className="book-shelf-changer">
            <select id="genres" className="dropdown" onChange={this.handleShelfSelect}>
              <option disabled>Select an Option...</option>
              {shelves.map(item => (
                <option key={item.id} className="dropdown__option" value={item.shelf} selected={this.props.selectedShelf === item.shelf}>
                  {item.prettyShelf}
                </option>
              ))}
            </select>
          </div>
          <div className="bookTitle">
            <p>{this.state.title}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
