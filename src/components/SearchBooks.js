import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookListItem from './BookListItem';
import sortBy from 'sort-by';

class SearchBooks extends Component {
	state = {
		query: '',
		books: []
	};

	componentDidUpdate() {
		// Make sure that the search page shows nothing when there is no query.
		if (!this.state.query && this.state.books.length > 0)
			this.setState({ books: [] });
	}

	updateQuery = (query) => {
		this.setState({ query: query.replace(/\s\s+/g, ' ') }, this.getBooks(this.state.query));
	};

	clearQuery = () => {
		this.setState({ query: '', books: [] });
	};

	getBooks = (query) => {
		if (query) {
			BooksAPI.search(query).then( books => {
				if (books && !books.error) {
					books.map( book => (this.props.shelfBooks.filter(b => b.id === book.id).map(b => book.shelf = b.shelf)));
					books.sort(sortBy('title'));
					this.setState({ books });
				} else {
					this.setState({ books: [] });
				}
			}).then( () => {
				/* Check if the correct query is displayed. Fix for fast typing that
				 * could show false results from previous query.
				 */
				if (this.state.query !== query) {
					this.getBooks(this.state.query);
				}
			});
		} else {
			/* Request for animation frame so that the this.state.query has get its value.
			 * Fix for double whitespaces.
			 */
			requestAnimationFrame(timestamp => {
				this.state.query && this.getBooks(this.state.query);
			});
		}
	};

	render() {
		const { query, books } = this.state;
		const { onBookMove } = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{books.length === 0 && query && (
						<div className="search-no-results">
							<span>No results were found. Please check the <strong>Search Terms</strong> file.</span>
						</div>
					)}
					{books.length !== 0 && query && (
						<div className="search-clear-results">
							<span>Showing results for <em>"{query}"</em> - </span>
							<button onClick={this.clearQuery}>Clear query</button>
						</div>
					)}
					<ol className="books-grid">
						{books.map( book => (
							<BookListItem key={book.id} book={book} onBookMove={onBookMove} />
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBooks;