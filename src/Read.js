import React, { Component } from 'react';
import './App.css'
import Book from './Book';
class Read extends Component {
   

    render() {
        //TODO:that is passed throught props to be changed
        const { booklist } = this.props;
        return (<div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booklist.map(book => {
                        return (<li key={book.id}>
                            <Book onshelfchange={this.props.Change} book={book}></Book>
                        </li>)
                    })}
          </ol>
            </div>
        </div >)
    }


}
export default Read;