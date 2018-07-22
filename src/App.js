import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './components/Bookshelf';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    // Fetch all the books and store them in the app state.
    BooksAPI.getAll().then( books => {
      this.setState({ books });
    });
  }

  updateBookshelf = (book, shelf) => {
    // Change the shelf of the book.
    BooksAPI.update(book, shelf).then( () => {
      book.shelf = shelf;
      this.setState( state => ({
        books: state.books.filter( b => b.id !== book.id).concat([ book ])
      }));
    });
  };

  render() {
    const bookShelves = [
      {
        title: 'Currently Reading',
        shelf: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        shelf: 'wantToRead'
      },
      {
        title: 'Read',
        shelf: 'read'
      }
    ];

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookShelves.map( shelf => (
                <Bookshelf
                  key={shelf.shelf}
                  title={shelf.title}
                  shelf={shelf.shelf}
                  books={this.state.books}
                  onBookMove={this.updateBookshelf}
                />
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
        )}/>

        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
