import React from 'react'
import "./homecards1.css"
import { MovieControls } from './MovieControls'
export const HomeCards1 = (movie) => {
  return (
    
    <div className="card">
      <div className="poster"><img src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} /></div>
      <div className="details">
        <h1>{movie?movie.original_title:""}</h1>
        <h2>2021 • PG • 1hr 38min</h2>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
          <span>4.2/5</span>
        </div>
        <div className="tags">
          <span className="tag">Italian</span>
          <span className="tag">Drama</span>
          <span className="tag">Indie</span>
        </div>
        <p className="desc">
          Marco, a disillusioned backpacker in his late 20s, embarks on a solitary journey in search for meaning.
        </p>
        <div className="cast">
          <h3>Cast</h3>
          <MovieControls type ="watchlist" movie={movie}/>
        </div>
        
      </div>
    </div>
   
    
  )
}


