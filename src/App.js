import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchPage} />
        </Router>
      </div>
    )
  }
}

export default BooksApp
