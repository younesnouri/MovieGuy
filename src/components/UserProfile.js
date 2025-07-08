import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Moviecard } from './Moviecard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidheart } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faClock as regularclock } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { RatingsGraph } from './RatingsGraph';
import { ReviewsCard } from './ReviewsCard';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { GlobalContext } from '../context/GlobalState'
export const UserProfile = () => {

    
    const { watched, watchlist, favorite } = useContext(GlobalContext);
    const { username } = useParams();  
    
    const [userwatched, setUserwatched] = useState([]);
    const [userwatchlist, setUserwatchlist] = useState([]);
    const [userfavorite, setUserfavorite] = useState([]);
    const [reviewlist, setReviewlist] = useState([]); 
    const [activity, setActivity] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const calculateJaccardIndex = (setA, setB) => {
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);
        return intersection.size / union.size;
      };


      const convertToSet = (movies) => new Set(movies.map(movie => movie.id));

      
      useEffect(() => {
        // Convert arrays to sets
        const watchedSet = convertToSet(watched);
        const watchlistSet = convertToSet(watchlist);
        const favoriteSet = convertToSet(favorite);
      
        const userWatchedSet = convertToSet(userwatched);
        const userWatchlistSet = convertToSet(userwatchlist);
        const userFavoriteSet = convertToSet(userfavorite);
      
        // Calculate Jaccard Index for each category
        const watchedSimilarity = calculateJaccardIndex(watchedSet, userWatchedSet);
        const watchlistSimilarity = calculateJaccardIndex(watchlistSet, userWatchlistSet);
        const favoriteSimilarity = calculateJaccardIndex(favoriteSet, userFavoriteSet);
      
        console.log(`Watched Similarity: ${watchedSimilarity}`);
        console.log(`Watchlist Similarity: ${watchlistSimilarity}`);
        console.log(`Favorite Similarity: ${favoriteSimilarity}`);
      
        // Optional: calculate an overall similarity score
        const overallSimilarity = (watchedSimilarity + watchlistSimilarity + favoriteSimilarity) / 3;
        const similarityPercentage = overallSimilarity * 100
        console.log(`Overall Similarity: ${overallSimilarity}`);
      }, [watched, watchlist, favorite, userwatched, userwatchlist, userfavorite]);
      
      

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/moviewatched?username=${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const movies = data.movies;
                if (Array.isArray(movies) && movies.length > 0) {
                    const formattedMovies = movies.map((movieData) => {
                        const movie = JSON.parse(movieData.tmdb_movie);
                        return {
                            movie: movie,
                            rating: movieData.rating
                        };
                    });
                    setUserwatched(formattedMovies);  // Update the watched state
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [username]);  // Dependency array includes username to re-fetch if it changes

   

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/moviefavorite?username=${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const favoritemovies = data.movies;
                if (Array.isArray(favoritemovies) && favoritemovies.length > 0) {
                    const formattedMovies = favoritemovies.map(movieData => JSON.parse(movieData));
                    setUserfavorite(formattedMovies); 
                    setUserfavorite(prevFavorites => [...prevFavorites].reverse()); // Update the favorites state
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching favorite movies:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [username]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/moviereviews?username=${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const movieReviews = data.movieReviews; // Assuming `data` is already an object

                if (Array.isArray(movieReviews) && movieReviews.length > 0) {
                    const formattedReviews = movieReviews.map(review => {
                        const movie = JSON.parse(review.tmdb_movie);
                        return {
                            movie: movie,
                            review: review.review,
                            rating: review.rating
                        };
                    });
                    setReviewlist(formattedReviews); // Correctly update the reviewlist state
                }
            })
            .catch((error) => {
                console.error('Error fetching movie reviews:', error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [username]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/recentactivity?username=${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const activities = data.movies; // Assuming `data.movies` contains the activities

                if (Array.isArray(activities) && activities.length > 0) {
                    const formattedActivities = activities.map(activity => {
                        const movie = JSON.parse(activity.tmdb_movie);
                        return {
                            movie: movie,
                            activity_type: activity.activity_type,
                            timestamp: activity.timestamp,
                            rating: activity.rating
                        };
                    });
                    setActivity(formattedActivities); // Correctly update the activity state
                }
            })
            .catch((error) => {
                console.error('Error fetching recent activity:', error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [username]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/moviewatchlist?username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.movies) && data.movies.length > 0) {
                    const formattedMovies = data.movies.map((movieData, index) => ({
                        ...JSON.parse(movieData),  // Assuming each movieData is a JSON string
                        priority: data.priority[index] // Assuming priority is stored at the same index
                    }));
                    setUserwatchlist(formattedMovies);
                    setUserwatchlist(prevWatchlist => [...prevWatchlist].reverse());
                }
            })
            .catch(error => {
                console.error('Error fetching watchlist:', error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [username]);




    const image = require("./images/driveimg.jpg")
    console.log(activity)
    const [activeTab, setActiveTab] = useState('section1');
  
    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };
    const reversedactivity = [...activity]

    
    
    //setUserwatched(prevWatched => [...prevWatched].reverse());
    

    
  
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
  
    const getTimeDifference = (timestamp) => {
      const now = new Date();
      const activityTimestamp = new Date(timestamp);
      const timeDifference = Math.floor((now - activityTimestamp) / (1000 * 60 * 60 * 24));
  
      return timeDifference === 0 ? ' today' : ` ${timeDifference} days ago`;
    };
    const ratingss = reviewlist.map((item) => item.rating);
    const [ratings, setRatings] = useState([4, 5, 3, 5, 2, 4, 5, 3, 4, 1, 5, 1.5, 2.5, 3.5, 4.5])
    const averageRating = ratingss.reduce((acc, curr) => acc + curr, 0) / ratingss.length;
    const percentage = averageRating / 5 * 100




    return (
        <>
      
      <div className='pagecontainer'>
        <div className='main1'>
          <div class="boxb">
            <div class="circlee">
              <img src={image} alt="./images/driveimg.jpg" />
            </div>

            <div class="text">
              <h2 class="topic-heading">{username}</h2>
              <h2 class="topic">film bro</h2>
              <h2 class="topic">'member since April 2024'</h2>

            </div>
            
            <div style={{ width: 100, height: 100 }}>
              <CircularProgressbar value={percentage} text={averageRating.toFixed(1) + '★'}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  strokeLinecap: 'round', // Rounded corners
                  textSize: '22px',
                  pathTransitionDuration: 0.5,
                  pathColor: '#FFD700', // Gold color for the progress path
                  textColor: '#FFD700', // Gold color for the text
                  trailColor: 'transparent', // Light gray for the trail
                  backgroundColor: '#1C2A4B',

                })} />
                
            </div>

          </div>
          <div >




            <div >
              <div className='movie-page'>
                <h2 className='heading' style={{ marginLeft: '50px' }} >Recent Activity</h2></div>
              <div className='movie-grid' style={{ marginLeft: '50px' }}>
                {reversedactivity?.slice(0, 4).map((reversedactivity) => (
                  <Moviecard movie={reversedactivity.movie} type={reversedactivity.activity_type} />
                ))}
              </div>

            </div>
            <div className='movie_containerrr'>
              <h2 className='heading' style={{ color: 'white' }} >Reviews</h2>
              {reviewlist.length > 0 ? (
                <div className="reviews-container" style={{ marginLeft: '1px' }}>
                  {reviewlist.slice(0, 3).map((review) => (

                    <ReviewsCard movie={review.movie} review={review.review} rating={review.rating} type='profile' />
                  ))}
                </div>
              ) : (
                <h2 className='no-movies'>No movies in your reviewlist</h2>
              )}
              {/* <nav>
                <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                  <li style={{ display: 'inline', marginRight: '20px' }}>
                    <button
                      onClick={() => handleTabClick('section1')}
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: '0',
                        margin: '0',
                        cursor: 'pointer',
                        color: activeTab === 'section1' ? 'black' : 'gray',
                        fontWeight: activeTab === 'section1' ? 'bold' : 'normal',
                      }}
                    >
                      Watchlist
                    </button>
                  </li>
                  <li style={{ display: 'inline', marginRight: '20px' }}>
                    <button
                      onClick={() => handleTabClick('section2')}
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: '0',
                        margin: '0',
                        cursor: 'pointer',
                        color: activeTab === 'section2' ? 'black' : 'gray',
                        fontWeight: activeTab === 'section2' ? 'bold' : 'normal',
                      }}
                    >
                      Watched
                    </button>
                  </li>
                  <li style={{ display: 'inline', marginRight: '20px' }}>
                    <button
                      onClick={() => handleTabClick('section3')}
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: '0',
                        margin: '0',
                        cursor: 'pointer',
                        color: activeTab === 'section3' ? 'black' : 'gray',
                        fontWeight: activeTab === 'section3' ? 'bold' : 'normal',
                        textDecoration: activeTab === 'section3' ? 'underline' : 'none',
                        textDecorationColor: activeTab === 'section3' ? '#21d07a' : 'none',
                        textDecorationOffset: activeTab === 'section3' ? '15px' : 'none',
                      }}
                    >
                      Favorites
                    </button>
                  </li>
                  <li style={{ display: 'inline' }}>
                    <button
                      onClick={() => handleTabClick('section4')}
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: '0',
                        margin: '0',
                        cursor: 'pointer',
                        color: activeTab === 'section4' ? 'black' : 'gray',
                        fontWeight: activeTab === 'section4' ? 'bold' : 'normal',
                      }}
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
              </nav>

              <div style={{ display: activeTab === 'section1' ? 'block' : 'none' }} id="section1">

                <div className='movie-grid'>
                  {watchlist?.slice(0, 10).map((movie) => (
                    <Moviecard movie={movie} />
                  ))}
                </div>
              </div>

              <div style={{ display: activeTab === 'section2' ? 'block' : 'none' }} id="section2">

                <div className='movie-grid'>
                  {watched?.slice(0, 10).map((movie) => (
                    <Moviecard movie={movie.movie} />
                  ))}
                </div>
              </div>

              <div style={{ display: activeTab === 'section3' ? 'block' : 'none' }} id="section3">

                <div className='movie-grid'>
                  {favorite?.slice(0, 10).map((movie) => (
                    <Moviecard movie={movie} />
                  ))}
                </div>
              </div>

              <div style={{ display: activeTab === 'section4' ? 'block' : 'none' }} id="section4">

                {reviewlist.length > 0 ? (
                  <div className="reviews-container" >
                    {reviewlist.map((review) => (

                      <ReviewsCard movie={review.movie} review={review.review} rating={review.rating} />
                    ))}
                  </div>
                ) : (
                  <h2 className='no-movies'>No movies in your reviewlist</h2>
                )}
              </div> */}


            </div>



          </div>

        </div>
        <div className='sidebar1'>

          

          <div class="box-container" style={{marginTop : '110px'}}>

            <div class="box box1">
              <div class="text">
                <h2 class="topic-heading">{userwatchlist.length}</h2>
                <h2 class="topic">Watchlist</h2>

              </div>
              <FontAwesomeIcon icon={regularclock} size="3x" style={{ color: 'white' }} />

            </div>

            <div class="box box2">
              <div class="text">
                <h2 class="topic-heading">{userwatched.length}</h2>
                <h2 class="topic">Watched</h2>

              </div>
              <FontAwesomeIcon icon={faEye} size="3x" style={{ color: 'white' }} />

            </div>

            <div class="box box3">
              <div class="text">
                <h2 class="topic-heading">{userfavorite.length}</h2>
                <h2 class="topic">Favorites</h2>
              </div>
              <FontAwesomeIcon icon={solidheart} size="3x" style={{ color: 'white' }} />

            </div>




          </div>
          <div className='movie-page' style={{ marginLeft: '20px' }}>
            <h2 className='heading' >Favorites</h2>
          </div>
          <div className='movie-grid' style={{ marginLeft: '20px' }} >
            {userfavorite?.slice(0, 4).map((movie) => (
              <Moviecard movie={movie} />
            ))}



          </div>


          <div>
            <div className='movie-page' style={{ marginLeft: '20px' }}>
              <h2 className='heading' >Your Ratings</h2>
            </div>

            <RatingsGraph ratings={ratingss} />





          </div>
          <div className='movie-page' >
            <h2 className='heading' style={{ marginLeft: '20px' }} >Activity</h2>
            {reversedactivity.slice(0, 6).map((reversedactivity, index) => (
              <div key={index}>

                {reversedactivity.activity_type === 'added_to_watchlist' && (
                  <div className='boxs' style={{ marginLeft: '20px' }}>
                    <h2 className='heading' style={{ fontSize: '1.0em', color: 'white' }}>You added {reversedactivity.movie.title} to your watchlist. {getTimeDifference(reversedactivity.timestamp)} </h2>
                  </div>
                )}

                {reversedactivity.activity_type === 'added_to_watched' && (
                  <div className='boxs'>
                    <p>You watched {reversedactivity.movie.title}. {getTimeDifference(reversedactivity.timestamp)}</p>
                  </div>
                )}
                {reversedactivity.activity_type === 'added_to_favorites' && (
                  <div className='boxs'>
                    <p>You added {reversedactivity.movie.title} to your favorites. {getTimeDifference(reversedactivity.timestamp)}</p>
                  </div>
                )}
                {reversedactivity.activity_type === 'added_to_reviews' && (
                  <div className='boxs'>
                    <p>You rated {reversedactivity.movie.title}  {renderStars(reversedactivity.rating)}. {getTimeDifference(reversedactivity.timestamp)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
    );
};

export default UserProfile;
