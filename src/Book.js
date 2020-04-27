import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'


import styled from "styled-components";

import spinner from "./spinner.gif"

const shelves = [
  { id: 1, shelf: "None" },
  { id: 2, shelf: "Currently Reading" },
  { id: 3, shelf: "Want to Read" },
  { id: 4, shelf: "Read" }
];


const Sprite = styled.img`
  width: 20em;
  height: 20em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, .25, 1);
  &: hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-slect: none;
  -o-user-select: none;
`;


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
    if (e.target.value !== "None") {
      e.persist();
      if (e.target.value === "Currently Reading") {
        this.updateList("currentlyReading")
      }
      else if (e.target.value === "Want to Read") {
        this.updateList("wantToRead")
      }
      else if (e.target.value === "Read") {
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
                <option key={item.id} className="dropdown__option" value={item.shelf}>
                  {item.shelf}
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
