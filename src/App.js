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
  changeCR=async (book,changeto)=>
  {
    if("currentlyReading".localeCompare(changeto)===0)
    {
      return;
    }
    await BooksAPI.update(book,changeto);
    BooksAPI.get(book.id).then(book=>{
    if("read".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksCR:currState.booksCR.filter(item=>item.id!==book.id),
      booksR:[...currState.booksR,book]
    }))
   }
   else if("wantToRead".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksCR:currState.booksCR.filter(item=>item.id!==book.id),
      booksWTR:[...currState.booksWTR,book]
    }))
   }
   else if("none".localeCompare(changeto)===0)
   {
    this.setState((currState)=>({
      booksCR:currState.booksCR.filter(item=>item.id!==book.id),
    }))
   }
  });
  }
  changeR=async (book,changeto)=>
  {
    if("read".localeCompare(changeto)===0)
    {
      return;
    }
    await BooksAPI.update(book,changeto);
    BooksAPI.get(book.id).then(book=>{
    if("currentlyReading".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksR:currState.booksR.filter(item=>item.id!==book.id),
      booksCR:[...currState.booksCR,book]
    }))
   }
   else if("wantToRead".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksR:currState.booksR.filter(item=>item.id!==book.id),
      booksWTR:[...currState.booksWTR,book]
    }))
   }
   else if("none".localeCompare(changeto)===0)
   {
    this.setState((currState)=>({
      booksR:currState.booksR.filter(item=>item.id!==book.id),
    }))
   }
  });
    
  }
  changeWTR=async (book,changeto)=>
  {
    if("wantToRead".localeCompare(changeto)===0)
    {
      return;
    }
    await BooksAPI.update(book,changeto);
    BooksAPI.get(book.id).then(book=>{
    if("currentlyReading".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksWTR:currState.booksWTR.filter(item=>item.id!==book.id),
      booksCR:[...currState.booksCR,book]
    }))
   }
   else if("read".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksWTR:currState.booksWTR.filter(item=>item.id!==book.id),
      booksR:[...currState.booksR,book]
    }))
   }
   else if("none".localeCompare(changeto)===0)
   {
    this.setState((currState)=>({
      booksWTR:currState.booksWTR.filter(item=>item.id!==book.id),
    }))
   }
  });
    
  }
  changeFromSearchpage=async(book,changeto)=>
  {
   await BooksAPI.update(book,changeto);
    BooksAPI.get(book.id).then(book=>{
    if("wantToRead".localeCompare(changeto)===0)
    {
      this.setState((currState)=>({
        booksWTR:[...currState.booksWTR,book]
      }))
    }
    if("currentlyReading".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksCR:[...currState.booksCR,book]
    }))
   }
   else if("read".localeCompare(changeto)===0)
    {
    this.setState((currState)=>({
      booksR:[...currState.booksR,book]
    }))
   }
   else if("none".localeCompare(changeto)===0)
   {
    return;
   }
  });
    


  }

  render() {

    return (
      <div className="app">
        <Route exact path="/search" render={()=>(
          <SearchPage books={this.state.books} Change={this.changeFromSearchpage}></SearchPage>
        )}></Route>
        <Route exact path="/" render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <CurrentlyReading booklist={this.state.booksCR} Change={this.changeCR} ></CurrentlyReading>
                  <WanttoRead booklist={this.state.booksWTR} Change={this.changeWTR} ></WanttoRead>
                  <Read booklist={this.state.booksR} Change={this.changeR}></Read>
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
