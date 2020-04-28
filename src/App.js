import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './SearchPage';
import Home from './Home';

class BooksApp extends Component {
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
