import React from 'react'
import { MovieControls } from './MovieControls'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Moviecard = ({ movie, type, rating }) => {


  
  function isInteger(number) {
    return number % 1 == 0;
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold' }} />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfStroke} style={{ color: 'gold' }} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gray' }} />);
      }
    }

    return stars;
  };

  return (

    <div className='movie-card'>
      <div className='priority'>
        {type === "watched" && rating !== null && (


          <span className='count-pill2'> {renderStars(rating)}{isInteger(rating) ? `${rating}.0` : rating}</span>




        )}
      </div>

      <div className='overlay'></div>
      {type === "watchlist" && movie.priority && (<div className='overlay2'></div>)}
      {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.title} Poster`} />
      ) : (
        <div className='filler-poster'></div>
      )
      }

      <MovieControls type={type} movie={movie} />
      {type === "added_to_watchlist" &&
      <div className='movie-info'>
        <div className='movie-user'>
        <h2 className='heading' style={{ fontSize: '0.6em' , color: 'white'}}>Added to Watchlist</h2>
        </div>
      </div>
    }
    {type === "added_to_watched" &&
      <div className='movie-info'>
        <div className='movie-user'>
        <h2 className='heading' style={{ fontSize: '0.6em' , color: 'white'}}>Watched</h2>
      </div>
      </div>
    }
    {type === "added_to_favorites" &&
      <div className='movie-info'>
        <div className='movie-user'>
        <h2 className='heading' style={{ fontSize: '0.6em' , color: 'white'}}>Added to favorites</h2>
      </div>
      </div>
    }
    
    {type === "added_to_reviews" &&
      <div className='movie-info'>
        <div className='movie-user'>
        <h2 className='heading' style={{ fontSize: '0.6em' , color: 'white'}}>Added to Reviews</h2>
      </div>
      </div>
    }
    </div>


  )
}


