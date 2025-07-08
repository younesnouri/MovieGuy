import React, { createContext, useReducer, useEffect, useState } from 'react'
import AppReducer from "./AppReducer"
import { useAuth } from '../components/AuthProvider'


const initialState = {
  watchlist: [],
  watched: [],
  favorite: [],
  reviewlist: [],
  activity: []
}

export const GlobalContext = createContext(initialState)



export const GlobalProvider = props => {
  const [test, setTest] = useState(0);
  const [test1, setTest1] = useState(0);
  const [test2, setTest2] = useState(0);
  const [test3, setTest3] = useState(0);
  const [test4, setTest4] = useState(0);
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const { user } = useAuth();

  useEffect(() => {


    dispatch({ type: 'CLEAR_WATCHLIST' });


    const username = user.username
    fetch(`http://localhost:5000/moviewatchlist?username=${username}`)
      .then((response) => response.json())
      .then((data) => {


        if (Array.isArray(data.movies) && data.movies.length > 0) {
          const movies = data.movies.map((movieString) => JSON.parse(movieString));
          const priority = data.priority;
          movies.forEach((movie, index) => {

            dispatch({
              type: 'ADD_MOVIE_TO_WATCHLIST', payload: {
                movie,
                priority: priority[index]
              }
            });


          }

          )
        }

      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });

  }, [test, user.username])


  useEffect(() => {


    dispatch({ type: 'CLEAR_WATCHED' });


    const username = user.username
    fetch(`http://localhost:5000/moviewatched?username=${username}`)
      .then((response) => response.json())
      .then((data) => {


        const movies = data.movies;

        if (Array.isArray(movies) && movies.length > 0) {



          movies.forEach((moviee) => {
            const movie = JSON.parse(moviee.tmdb_movie);

            const rating = moviee.rating;


            const reviewObject = {
              movie: movie,

              rating: rating
            };



            dispatch({ type: 'ADD_MOVIE_TO_WATCHED', payload: reviewObject });

          });



        }

      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });

  }, [test1, user.username])



  useEffect(() => {


    dispatch({ type: 'CLEAR_FAVORITE' });


    const username = user.username
    fetch(`http://localhost:5000/moviefavorite?username=${username}`)
      .then((response) => response.json())
      .then((data) => {


        if (Array.isArray(data.movies) && data.movies.length > 0) {
          const favoritemovies = data.movies.map((movieString) => JSON.parse(movieString));

          favoritemovies.forEach((movie) => {

            dispatch({ type: 'ADD_MOVIE_TO_FAVORITE', payload: movie });


          }



          )
        }

      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });

  }, [test2, user.username])



  useEffect(() => {


    dispatch({ type: 'CLEAR_REVIEWLIST' });


    const username = user.username
    fetch(`http://localhost:5000/moviereviews?username=${username}`)
      .then((response) => response.json())
      .then((data) => {


        const movieReviews = data.movieReviews; // Assuming `data` is already an object

        if (Array.isArray(movieReviews) && movieReviews.length > 0) {


          // Iterate over the `movieReviews` array and insert data into `reviewlist`
          movieReviews.forEach((review) => {
            const movie = JSON.parse(review.tmdb_movie);
            const reviewText = review.review;
            const rating = review.rating;
            const timestamp = review.timestamp;
            // Create an object with both movie and review
            const reviewObject = {
              movie: movie,
              review: reviewText,
              rating: rating,
              timestamp: timestamp
            };


            // Push the reviewObject into `reviewlist`
            //state.reviewlist.push(reviewObject);
            dispatch({ type: 'ADD_REVIEW_TO_LIST', payload: reviewObject });

          });

          // Now, `reviewlist` contains the extracted movie and review data.

        }

      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });

  }, [test3, user.username])





  useEffect(() => {


    dispatch({ type: 'CLEAR_ACTIVITY' });


    const username = user.username
    fetch(`http://localhost:5000/recentactivity?username=${username}`)
      .then((response) => response.json())
      .then((data) => {


        const movies = data.movies;

        if (Array.isArray(movies) && movies.length > 0) {



          movies.forEach((moviee) => {
            const movie = JSON.parse(moviee.tmdb_movie);
            const activity_type = moviee.activity_type;
            const timestamp = moviee.timestamp;

            const rating = moviee.rating;


            const reviewObject = {
              movie: movie,
              activity_type: activity_type,
              timestamp: timestamp,

              rating: rating
            };



            dispatch({ type: 'ADD_MOVIE_TO_ACTIVITY', payload: reviewObject });

          });



        }

      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });

  }, [test4, user.username])


  const AddMovieToWatchlist = (movie) => {



    const requestData = {
      username: user.username,
      movie: movie,
      movieID: movie.id

    };


    fetch('http://localhost:5000/moviewatchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTest((prevTest) => prevTest + 1);


      })
      .catch((error) => {
        console.error('Error adding movie to watchlist:', error);
      });

    AddMovieToRecentActivity(movie, 'added_to_watchlist')
  };

  const AddMovieToWatched = (movie) => {


    const requestData = {
      username: user.username,
      movie: movie,
      movieID: movie.id

    };


    fetch('http://localhost:5000/moviewatched', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTest1((prevTest1) => prevTest1 + 1);
        // setTest((prevTest) => prevTest + 1);



      })
      .catch((error) => {
        console.error('Error adding movie to watched:', error);
      });

    AddMovieToRecentActivity(movie, 'added_to_watched')
  };

  const AddMovieToFavorite = (movie) => {



    const requestData = {
      username: user.username,
      movie: movie,
      movieID: movie.id

    };


    fetch('http://localhost:5000/moviefavorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTest2((prevTest2) => prevTest2 + 1);




      })
      .catch((error) => {
        console.error('Error adding movie to favorite:', error);
      });
    AddMovieToRecentActivity(movie, 'added_to_favorites')
  };


  const AddMovieToRecentActivity = (movie, activity_type) => {



    const requestData = {
      username: user.username,
      movie: movie,
      movieID: movie.id,
      activity_type: activity_type

    };


    fetch('http://localhost:5000/recentactivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTest4((prevTest4) => prevTest4 + 1);


      })
      .catch((error) => {
        console.error('Error adding movie to recentactivity :', error);
      });
  };

  const Removefromwatchlist = (id) => {
    const requestData = {

      movieID: id

    };
    fetch('http://localhost:5000/moviewatchlist', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {

        //console.log('Movie deleted from watchlist successfully');
        setTest((prevTest) => prevTest + 1);

      })
      .catch((error) => {
        console.error('Error deleting movie from watchlist:', error);
      });

  }


  const Removefromwatched = (id) => {
    const requestData = {

      movieID: id

    };
    fetch('http://localhost:5000/moviewatched', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {


        setTest1((prevTest1) => prevTest1 + 1);

      })
      .catch((error) => {
        console.error('Error deleting movie from watched:', error);
      });

  }

  const Removefromfavorite = (id) => {
    const requestData = {

      movieID: id

    };
    fetch('http://localhost:5000/moviefavorite', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {


        setTest2((prevTest2) => prevTest2 + 1);

      })
      .catch((error) => {
        console.error('Error deleting movie from favorite:', error);
      });

  }

  const AddReviewToList = (movie, review, rating) => {



    const requestData = {
      username: user.username,
      movie: movie,
      movieID: movie.id,
      review: review,
      rating: rating
    };


    fetch('http://localhost:5000/moviereviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTest3((prevTest3) => prevTest3 + 1);


      })
      .catch((error) => {
        console.error('Error adding review to list:', error);
      });
    AddMovieToRecentActivity(movie, 'added_to_reviews')
  };


  const updatePriority = async (movie, highPriority) => {
    try {

      const response = await fetch('http://localhost:5000/moviewatchlist', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.username,
          movieID: movie.id,
          priority: !highPriority
        })
      });
      setTest((prevTest) => prevTest + 1);


    } catch (error) {
      console.error('Error updating priority:', error);

    }
  };





  return (


    <GlobalContext.Provider value={{
      watchlist: state.watchlist,
      watched: state.watched,
      reviewlist: state.reviewlist,
      favorite: state.favorite,
      activity: state.activity,
      AddMovieToWatchlist,
      Removefromwatchlist,
      AddMovieToWatched,
      Removefromwatched,
      AddMovieToFavorite,
      Removefromfavorite,
      AddReviewToList,
      updatePriority,

    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

