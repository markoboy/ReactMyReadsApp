import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		shelf: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired
	};

	render() {
		// Store the title, shelf and books for easier use.
		const { title, shelf, books, onBookMove } = this.props;

		// Show the books from the picked shelf.
		let showingBooks = books.filter( book => book.shelf === shelf);

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{showingBooks.map( book => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
										<div className="book-shelf-changer">
											<select value={shelf} onChange={(e) => onBookMove(book, e.target.value)}>
												<option value="move" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
									<div className="book-authors">{book.authors.join(', ')}</div>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default Bookshelf;