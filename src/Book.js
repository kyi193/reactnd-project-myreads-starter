import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from "styled-components";

import spinner from "./spinner.gif"

const shelves = [
  { id: 1, shelf: "Currently Reading" },
  { id: 2, shelf: "Want to Read" },
  { id: 3, shelf: "Read" },
  { id: 4, shelf: "None" }
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
  state = {
    key: '',
    title: '',
    imageUrl: '',
    imageLoading: true,
    tooManyRequests: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.shelf !== this.state.shelf) {
      if (this.state.shelf === "" || this.state.shelf === undefined) {
        return;
      }
    }
  }
  componentDidMount() {
    const { key, title, imageUrl } = this.props;

    this.setState({
      key,
      title,
      imageUrl
    });
  }

  handleShelfSelect = e => {
    if (e.target.value !== "None") {
      e.persist();
      const genre = e.target.value;
      this.setState({ shelf: genre });
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

