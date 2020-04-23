import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div className="search-books-bar">
      <button 
        className="close-search" 
        onClick={this.props.returnHome}>
          Close
      </button>
      <div className="search-books-input-wrapper">
        <input 
          type = 'text'
          placeholder="Search by title or author"
          value= {this.state.searchTerm}
          onChange = {this.updateSearch}
        />
      </div>
    </div>
    )
  }
}
