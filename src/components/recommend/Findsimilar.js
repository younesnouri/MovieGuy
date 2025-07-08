import React, { useState } from 'react';
import './Recommend.css'; // Assuming you have some basic styles defined
import { Resultcard } from '../Resultcard'
import { Moviecard } from '../Moviecard'
import './lightsaber.css';
export const Findsimilar = () => {
    const [movieName, setMovieName] = useState('');
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [movies, setMovies] = useState();

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
        setIsloading(true)
        fetch('http://localhost:5000/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieTitles: tags // Assuming 'tags' is an array of movie titles
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






    const [results, setResults] = useState([])
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');





    const onChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value)

        if (e.target.value !== ("")) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=3ea4fa01d32e2964852b911667dd32ab&include_adult=false&language=en-US&page=1&query=${e.target.value}`)
                .then((res) => res.json())
                .then(data => {
                    if (!data.errors) {

                        setResults(data.results)
                    } else {
                        setResults([])
                    }

                })
        }
    }





    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const removeAllTags = () => {
        setTags([]);
    };

    const addMovieToTags = (movie) => {
        // Check if the movie is already added to prevent duplicates
        if (!tags.some(tag => tag === movie.title)) {
            setTags([...tags, movie.title]);
            setInputValue('');
        }
        else {
            setInputValue('');
        }
    };




    




    return (

        <><div className='wrapper-container'>
            <div className='wrapper'>
                <div className="title">
                    <h2>Movies</h2>
                </div>
                <div className="content">

                    <ul>
                        {tags.map((tag, index) => (
                            <li key={index} className="tag">
                                {tag}
                                <span onClick={() => removeTag(index)} className="fa-fw fa fa-times"></span>
                            </li>
                        ))}
                        <input
                            type="text"
                            spellCheck="false"
                            value={inputValue}
                            onChange={onChange}

                            placeholder="Add a movie" />


                    </ul>







                </div>
                <div className='detailsrec'>

                    <button onClick={handleRecommendClick} className="recommend-btn">Find Similar</button>
                    <div className='button-container'>
                        <button onClick={removeAllTags}>Remove All</button>
                    </div>

                </div>
                {results.length > 0 && inputValue !== "" && (

                    <ul className='resultshorizon'>
                        {results.slice(0, 2).map((movie) => (<li key={movie.id}>

                            <button style={{
                                padding: 0, border: 'none', background: 'none', cursor: 'pointer',
                            }} onClick={(event) => {
                                event.preventDefault();
                                addMovieToTags(movie);


                            }}>
                                <Resultcard movie={movie} />
                            </button>
                        </li>))}
                    </ul>
                )}





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