import React, { useState,useContext } from 'react';
import './Recommend.css'; // Assuming you have some basic styles defined
import { Resultcard } from '../Resultcard'
import { Moviecard } from '../Moviecard'
import './lightsaber.css';
import { GlobalContext } from '../../context/GlobalState';

export const Recommend = () => {
    const { reviewlist } = useContext(GlobalContext);
    const [movieName, setMovieName] = useState('');
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [movies, setMovies] = useState();
    const userId = localStorage.getItem('user_id');
    const user_id = Number(userId) + 610

    console.log(user_id)

    
    

    const handleInputChange = (e) => {
        setMovieName(e.target.value);
    };

    const addMovie = (movie) => {
        if (movie && !selectedMovies.includes(movie)) {
            setSelectedMovies([...selectedMovies, movie]);
            setMovieName(''); // Clear the input box after adding
        }
    };

    const removeMovie = (movieToRemove) => {
        setSelectedMovies(selectedMovies.filter(movie => movie !== movieToRemove));
    };



    const handleRecommendClick = async () => {
        
        console.log(user_id)
        setIsloading(true)
        fetch('http://localhost:5002/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user_id 
            }),
        })
            .then(response => response.json())
            .then(recommendations => {
                console.log('Recommendations:', recommendations);

                // Map over each recommendation to fetch movie details from TMDB API
                const fetchPromises = recommendations.map(recommendation => {
                    const id = recommendation; // Assuming each recommendation object includes an 'id' field
                    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3ea4fa01d32e2964852b911667dd32ab&language=en-US`)
                        .then(res => res.json())
                        .catch(error => console.error('Fetching movie details failed:', error));
                });

                // Wait for all fetch operations to complete
                return Promise.all(fetchPromises);
            })
            .then(moviesDetails => {
                // 'moviesDetails' is an array of movie detail objects fetched from TMDB API
                console.log('Movies Details:', moviesDetails);
                setIsloading(false);
                // Assuming you want to store all movie details
                setMovies(moviesDetails)
                console.log(movies)
                //setMovies(moviesDetails.filter(movie => movie != null)); // Filter out any possible failed fetches
            })
            .catch((error) => {
                console.error('Error fetching recommendations:', error);
            });
    };



    const handleClick = async () => {
        setIsloading(true);  // Assuming you manage loading state in your component
    
        try {
            await fetch('http://localhost:5001/submit_csv', { method: 'POST' });
    
            const reviewResponses = await Promise.all(reviewlist.map(review => 
                fetch('http://localhost:5001/submit_rating', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user_id,
                        movieId: review.movie.id,
                        rating: review.rating,
                        timestamp: review.timestamp
                    })
                })
            ));
    
            for (const response of reviewResponses) {
                if (!response.ok) throw new Error(`Failed to submit review: ${response.statusText}`);
                const message = await response.json();
                console.log(message);
            }
    
            const mergeResponse = await fetch('http://localhost:5001/merge_ratings');
            if (!mergeResponse.ok) throw new Error('Failed to merge ratings');
            const mergeData = await mergeResponse.json();
            alert(mergeData.message);
    
            const recommendResponse = await fetch('http://localhost:5001/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user_id })
            });
            if (!recommendResponse.ok) throw new Error('Failed to fetch recommendations');
            const recommendations = await recommendResponse.json();
            console.log(recommendations)
    
            const movieDetails = await Promise.all(recommendations.map(id =>
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3ea4fa01d32e2964852b911667dd32ab&language=en-US`)
            ));
            const movies = await Promise.all(movieDetails.map(async detail => {
                if (!detail.ok) return null;  // handle failed requests gracefully
                return await detail.json();
            }));
    
            setMovies(movies.filter(movie => movie != null)); // Update state with fetched movie details
        } catch (error) {
            console.error('An error occurred:', error);
            alert(error.message);
        } finally {
            setIsloading(false);  // Ensure loading state is reset even if an error occurs
        }
    };
    
    
    



    const [results, setResults] = useState([])
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');





    const onChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value)

        
    }





   
    

    




    




    return (

        <><div className='wrapper-container'>
            <div className='wrapper'>
                <div className="title">
                    <h2>Personalized Recommendations Based on your ratings!</h2>
                </div>
                <div className="content">

                  







                </div>
                <div className='detailsrec'>

                    <button onClick={handleRecommendClick} className="recommend-btn">Recommend</button>
                    <div className='button-container'>
                    {/* <button onClick={handleClick} className="recommend-btn">send ratings</button>   */}
                    </div>

                </div>
                





            </div>
        </div><div>
                {!isloading ? (


                    <div className='movie-page'>
                        <div className='container'>
                            <div className='header'>
                                <div className='movie-grid'>
                                    {movies?.map((movie, index) => (
                                        <div key={movie.id} className="movie">

                                            {<Moviecard key={movie.id} movie={movie} type="home" />}
                                            <h2 className='heading'>{movie.title}</h2>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <><div class="loader-container">
                            <div class="dot-loader"></div>
                            <div class="dot-loader"></div>
                            <div class="dot-loader"></div>
                        </div>
                        
                        <div id="loader">
                                <div class="ls-particles ls-part-1"></div>
                                <div class="ls-particles ls-part-2"></div>
                                <div class="ls-particles ls-part-3"></div>
                                <div class="ls-particles ls-part-4"></div>
                                <div class="ls-particles ls-part-5"></div>
                                <div class="lightsaber ls-left ls-green"></div>
                                <div class="lightsaber ls-right ls-red"></div>
                            </div></>


                    

                )

                }

            </div></>




    );
};