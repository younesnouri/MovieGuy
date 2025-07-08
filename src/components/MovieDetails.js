import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import "./movie.css"
import { useParams } from 'react-router-dom'
import ReviewModal from './ReviewModal';


export const MovieDetails = () => {

  const [movie, setMovie] = useState()
  const { id } = useParams()
  const {
    AddMovieToWatchlist, watchlist, AddReviewToList

  } = useContext(GlobalContext)

  let storedMovie = watchlist.find(o => o.id === movie?.id)

  const watchlistDisabled = storedMovie ? true : false

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [movieReview, setMovieReview] = useState('');

  useEffect(() => {
    getData()
    getData2()

    window.scrollTo(0, 0)
  }, [id])

  const getData = () => {

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3ea4fa01d32e2964852b911667dd32ab&language=en-US&`)
      .then((res) => res.json())
      .then(data => {
        if (!data.errors) {

          setMovie(data)

        } else {
          console.log("error")
        }

      })
  }
  const getData2 = () => {

    fetch(`https://api.themoviedb.org/3/movie/862/reviews?api_key=3ea4fa01d32e2964852b911667dd32ab&language=en-US&page=1`)
      .then((res) => res.json())
      .then(data => {
        if (!data.errors) {

          console.log(data)

        } else {
          console.log("error")
        }

      })
  }


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

  const handleSaveReview = (review, rating) => {
    // You can save the review text to your database or state here.
    console.log(review);

    AddReviewToList(movie, review, rating)

    closeReviewModal();
  };

  return (

    <div className="movie-card1" >
      {movie ? (
        <div className="container1" >

          <a href="#">

            <div>

              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="cover" class="cover" />



            </div>

          </a>

          <div className="hero" >

            <div className="details1" style={backgroundStyle}>

              <div className="title1"  >{movie.title}  </div>

              <div class="title2 " >{movie.tagline}</div>
              <div class="title3 " >  {movie.release_date ? movie.release_date.substring(0, 4) : '-'}</div>
              <div class="title3 " >  {movie.runtime} mins</div>




              <span className="likes" >109 likes</span>


            </div>

          </div>

          <div className="description">

            <div className="column1">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="tag">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="column2">

              <p>{movie.overview}</p>



              <div className='controls'>
                <button className='btn btn-success' disabled={watchlistDisabled}
                  onClick={() => AddMovieToWatchlist(movie)}>
                  Add to Watchlist
                </button>
                

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
                    releaseYear: movie.release_date ? movie.release_date.substring(0, 4) : '-',
                    runtime: movie.runtime,
                    genres: movie.genres.map((genre => genre.name)),
                    backgroundStyle: backgroundStyle,

                  }}
                />}
              </div>
              <div> </div>

            </div>


          </div>


        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}


