import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookListItem extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		onBookMove: PropTypes.func.isRequired
	};

	render() {
		const { book, onBookMove } = this.props;

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className={!book.imageLinks ? 'book-cover book-no-cover' : 'book-cover'}
							style={
								book.imageLinks ?
									{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` } :
									{ width: 128, height: 193 }
							}
						></div>
						<div className="book-shelf-changer">
							<select value={book.shelf ? book.shelf : 'none'} onChange={(e) => onBookMove(book, e.target.value)}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{book.authors && (book.authors.join(', '))}</div>
				</div>
			</li>
		);
	}
}

export default BookListItem;