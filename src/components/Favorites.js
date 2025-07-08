import React,{useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Moviecard } from './Moviecard'
import { FloatingButton } from './floatingbutton/FloatingButton'
export const Favorites = () => {
    const{favorite}= useContext(GlobalContext)
    
  return (
    <><div className='movie-page'>
      <div className='container'>
        <div className='header'>
          <h2 className='heading'> Favorites

          </h2>
          <span className='count-pill'>{favorite.length}{favorite.length == 1 ? " Movie" : " Movies"}  </span>

        </div>
        {favorite.length > 0 ? (
          <div className='movie-grid1'>
            {favorite.map((movie) => (
              <Moviecard movie={movie} type="favorite" />
            ))}
          </div>
        ) : (
          <h2 className='no-movies'>No movies in your favorites</h2>
        )}

      </div>
    </div><FloatingButton  /></>
  )
}



