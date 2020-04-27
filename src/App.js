import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import Home from './Home'

//refactor functions to ES6 syntax

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSearchPage: false,
      shelvedBooks: [],
    }
    this.returnHome = this.returnHome.bind(this);
    this.toSearch = this.toSearch.bind(this);

  }

  returnHome() {
    this.setState({
      showSearchPage: false
    })
  }

  toSearch() {
    this.setState({
      showSearchPage: true
    })
  }



  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage returnHome={this.returnHome} />
        ) : (
            <Home toSearch={this.toSearch} />
          )}
      </div>
    )
  }
}

export default BooksApp
