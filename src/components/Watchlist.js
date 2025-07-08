import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Moviecard } from './Moviecard'
import { FloatingButton } from './floatingbutton/FloatingButton'
import { SearchBar } from './SearchBar'
export const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext)

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prevVisible) => !prevVisible);
    console.log(isSearchBarVisible)
  };












  return (
    <>
      {isSearchBarVisible && <SearchBar type = 'watchlist' />}
      <div className='movie-page'>
        <div className='container'>
          <div className='header'>
            <h2 className='heading'> Watchlist

            </h2>
            <span className='count-pill'>{watchlist.length}{watchlist.length == 1 ? " Movie" : " Movies"}  </span>
          </div>
          {watchlist.length > 0 ? (
            <div className='movie-grid1'>
              {watchlist.map((movie) => (
                <Moviecard movie={movie} type="watchlist" />
              ))}
            </div>
          ) : (
            <h2 className='no-movies'>No movies in your watchlist</h2>
          )}

        </div>

      </div>
      <FloatingButton onClick={toggleSearchBar} />


    </>




  )
}


