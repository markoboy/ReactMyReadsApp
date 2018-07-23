import React, { Component } from 'react';
import BookListItem from './BookListItem';
import PropTypes from 'prop-types';
import SortBy from 'sort-by';

class Bookshelf extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		shelf: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		onBookMove: PropTypes.func.isRequired
	};

	render() {
		// Store the title, shelf and books for easier use.
		const { title, shelf, books, onBookMove } = this.props;

		// Show the books from the picked shelf.
		let showingBooks = books.filter( book => book.shelf === shelf);
		showingBooks.sort(SortBy('title'));

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{showingBooks.map( book => (
							<BookListItem key={book.id} book={book} onBookMove={onBookMove} />
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default Bookshelf;