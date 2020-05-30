import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading';
import WanttoRead from './WanttoRead';
import Read from './Read'
import {Route,Link} from 'react-router-dom'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    booksCR: [],
    booksR: [],
    booksWTR: [],
    showSearchPage: false
  }
  

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books); this.setState(() => ({
        books: books,
        booksCR: books.filter(item => item.shelf === "currentlyReading"),
        booksR: books.filter(item => item.shelf === "read"),
        booksWTR: books.filter(item => item.shelf === "wantToRead")
      }))
    })
  }
  //TODO:RESUME HERE
  changeofshelf=async(book,changeto)=>
  {
     
     await BooksAPI.update(book,changeto);
      book.shelf=changeto;
      let newstate=this.state.books.filter(b=>book.title!==b.title);
      console.log("new:",newstate);
      if(newstate){newstate.push(book);}
      await this.setState((currState)=>({books:newstate})) 
  }

  render() {

    return (
      <div className="app">
      
        {/* {JSON.stringify(this.state)} */}
        <Route exact path="/search" render={({history})=>(
          <SearchPage books={this.state.books} Change={this.changeofshelf}></SearchPage>
        )}></Route>
        <Route exact path="/" render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <CurrentlyReading booklist={this.state.books.filter(item => item.shelf === "currentlyReading")} Change={this.changeofshelf} ></CurrentlyReading>
                  <WanttoRead booklist={this.state.books.filter(item => item.shelf === "wantToRead")} Change={this.changeofshelf} ></WanttoRead>
                  <Read booklist={this.state.books.filter(item => item.shelf === "read")} Change={this.changeofshelf}></Read>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                <button >Add a book</button>
                </Link>
              </div>
            </div>
            //FIXME:
          )}></Route>
       
      </div>
    )
  }
}

export default BooksApp;
