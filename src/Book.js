import React, { Component } from 'react';

class Book extends Component {
    state={
        shelf:this.props.book.shelf?this.props.book.shelf:"none" 
    }
    change=(value)=>
    {
        this.setState(()=>({shelf:value}));
        this.props.onshelfchange(this.props.book,value);
               
    }
    render() {
        const {book}=this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:""})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={(event)=>{this.change(event.target.value)}}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors?book.authors.map(author => `${author}`):(<span></span>)}</div>
            </div>
        )

    }

}
export default Book;