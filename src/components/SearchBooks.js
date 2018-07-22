import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
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
		this.setState({ query: query }, this.getBooks(query));
	};

	clearQuery = () => {
		this.setState({ query: '', books: [] });
	};

	getBooks = (query) => {
		if (query) {
			BooksAPI.search(query).then( books => {
				if (books && !books.error) {
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
		}
	};

	render() {
		const { query, books } = this.state;

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
							<li key={book.id}>{book.title}</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBooks;