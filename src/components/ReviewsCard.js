import React, { useState } from 'react'
import "./review1.css"
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const ReviewsCard = ({ movie, review, rating, type }) => {

  const backgroundStyle = movie
    ? {
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }

    : {};

  const { user } = useAuth();




  function isDecimal(number) {
    return number % 1 !== 0;
  }

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

    <>
      {type === 'profile' && <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
        <div className="movie_carddd2" id="bright">
          <div className="info_section1">
            <div className="movie_header1">
              <img className="locandina" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
              <h2 style={{ marginTop: '10px', fontSize: '15px' }}>{movie.title}</h2>
              <h4>{movie.relezase_date}</h4>
              <span className="minutes">{movie.runtime} mins</span>
              <p className="type">{movie.genres.slice(0, 2).map((genre => genre.name)).join(', ')}</p>
            </div>
            <div className="movie_desc1">
              <p className="text" style={{fontSize: '20px',marginBottom: '50px'}}>
                {review}      </p>
            </div>


            <div className='movie_rating'>
              {rating &&
                renderStars(rating)}
            </div>
            <div className="movie_social1">




              <ul>
                <li><i className="material-icons1">by {user.username}</i></li>
                {/* <li><i className="material-icons1">share</i></li>

        <li><i className="material-icons1">chat_bubble</i></li> */}
              </ul>
            </div>
          </div>



          <div className="blur_back bright_back1" style={backgroundStyle}></div>
        </div>
      </Link>}
      
      
        {type === 'reviews' &&
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
            <div className="movie_carddd1" id="bright">
              <div className="info_section1">
                <div className="movie_header1">
                  <img className="locandina" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                  <h2 style={{ marginTop: '10px', fontSize: '15px' }}>{movie.title}</h2>
                  <h4>{movie.relezase_date}</h4>
                  <span className="minutes">{movie.runtime} mins</span>
                  <p className="type">{movie.genres.slice(0, 2).map((genre => genre.name)).join(', ')}</p>
                </div>
                <div className="movie_desc1">
                  <p className="text">
                    {review}      </p>
                </div>


                <div className='movie_rating'>
                  {rating &&
                    renderStars(rating)}
                </div>
                <div className="movie_social1">




                  <ul>
                    <li><i className="material-icons1">by {user.username}</i></li>

                  </ul>
                </div>
              </div>



              <div className="blur_back bright_back1" style={backgroundStyle}></div>
            </div>
          </Link>
        }
    </>

      )
}


