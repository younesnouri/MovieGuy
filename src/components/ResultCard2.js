import React, { useContext,useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom';
import { MovieControls } from './MovieControls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularheart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidheart } from '@fortawesome/free-solid-svg-icons';
import { faClock as regularclock } from '@fortawesome/free-regular-svg-icons';
import { faClock as solidclock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import ReviewModal from './ReviewModal';

export const Resultcard2 = ({ movie, type }) => {


  const {
    AddMovieToWatchlist, watchlist, watched, AddMovieToWatched,AddReviewToList

  } = useContext(GlobalContext)

  let storedMovie = watchlist.find(o => o.id === movie.id)
  let storedWatchedMovie = watched.find(o => o.id === movie.id)
  const watchlistDisabled = storedMovie ? true : storedWatchedMovie ? true : false
  const watchedDisabled = storedWatchedMovie ? true : false

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const backgroundStyle = movie
  ? {
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }
    
  : {};
  

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };
  
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  
  const handleSaveReview = (review,rating) => {
    // You can save the review text to your database or state here.
    console.log(review);
    
    AddReviewToList(movie,review,rating)
    
    closeReviewModal(); 
  };

  return (
     <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
    <div className='results-container'>
      <div className='result-card' >
        <div className='overlay'></div>
        <div className='poster-wrapper'>
          {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />
          ) : (
            <div className='filler-poster'></div>
          )
          }
        </div>

        <div className='info'>
          <div className='header'>
            <h3 className='title'>{movie.title}</h3>
            <h4 className='release-date'>{movie.release_date ? movie.release_date.substring(0, 4) : '-'}</h4>

          </div>

        </div>
        


        {type === 'watchlist' &&
          <div className='controls'>
            <button className='btn btn-success' disabled={watchlistDisabled}
              onClick={(event) => {
                event.preventDefault();
                AddMovieToWatchlist(movie);
              }}>
              Add to Watchlist
            </button>


          </div>
        }

        {type === 'watched' &&
          <div className='controls'>
            <button className='btn btn-success' disabled={watchlistDisabled}
              onClick={(event) => {
                event.preventDefault();
                AddMovieToWatched(movie);
              }}>
              Add to Watched
            </button>


          </div>
        }

        {type === 'review' &&
          <div className='controls'>
            <button className='btn btn-success' onClick={openReviewModal} >
                    Add Review
                </button>
                {isReviewModalOpen && <ReviewModal
      isOpen={isReviewModalOpen}
      onClose={closeReviewModal}
      onSaveReview={handleSaveReview}
      movieDetails={{
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        releaseYear: movie.release_date? movie.release_date.substring(0,4) : '-',
        director: 'David Ayer',
        runtime: movie.runtime,
        //  genres: movie.genres.map((genre => genre.name)),
        backgroundStyle: backgroundStyle,
       
      }}
    />}


          </div>
        }


      </div>
    </div>
    </Link>
  )
}


