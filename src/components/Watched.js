import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Moviecard } from './Moviecard'
import { SearchBar } from './SearchBar'
import { FloatingButton } from './floatingbutton/FloatingButton'
export const Watched = () => {
  const { watched } = useContext(GlobalContext)
  
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prevVisible) => !prevVisible);
    console.log(isSearchBarVisible)
  };

  return (
    <>
    {isSearchBarVisible && <SearchBar type = 'watched' />}
    <div className='movie-page'>
      <div className='container'>
        <div className='header'>
          <h2 className='heading'> Watched

          </h2>
          <span className='count-pill'>{watched.length}{watched.length === 1 ? " Movie" : " Movies"}  </span>


        </div>
        {watched.length > 0 ? (
          <div className='movie-grid1'>
            {watched.map((movie) => (
              <Moviecard movie={movie.movie} rating={movie.rating} type="watched" />
            ))}
          </div>
        ) : (
          <h2 className='no-movies'>No movies in your watched</h2>
        )}

      </div>
    </div>
    <FloatingButton onClick={toggleSearchBar} />
    </>
  )
}



