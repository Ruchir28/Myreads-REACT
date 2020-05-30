import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book'
class SearchPage extends Component
{
  state={
    results:[],
    query:''
  }
  handlechange=async (value)=>{
    this.setState(()=>({query:value}));
    let allbooks=await BooksAPI.search(value);
    this.setState(()=>({results:allbooks}));
  }

    render()
    {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
              <button className="close-search" >Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input value={this.state.query} onChange={(event)=>{this.handlechange(event.target.value)}} type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
            {this.state.results && this.state.results.map?(
              <ol className="books-grid">
                {this.state.results.map(item=>{
                  this.props.books?this.props.books.map(book=>{if(book.id===item.id){item.shelf=book.shelf}}):item=item
                  return(<li key={item.id}><Book onshelfchange={this.props.Change} book={item}></Book></li>)
                  })}
              </ol>):(<div style={{textAlign:"center"}}>No matching results</div>)
            }  
            </div>
          </div>

            
        )
    }


} 
export default SearchPage;