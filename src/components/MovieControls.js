import React, { useState, useContext, useRef, useReducer } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularheart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidheart } from '@fortawesome/free-solid-svg-icons';
import { faClock as regularclock } from '@fortawesome/free-regular-svg-icons';
import { faClock as solidclock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';


import "./popup.css"
export const MovieControls = ({ movie, type }) => {

    const { Removefromwatchlist, AddMovieToWatchlist, watchlist, AddMovieToWatched, Removefromwatched, favorite
        , AddMovieToFavorite, Removefromfavorite, watched, updatePriority } = useContext(GlobalContext)

    const [watchedNotification, setWatchedNotification] = useState(false);
    const [FavoriteNotification, setFavoriteNotification] = useState(false);
    const [WatchlistNotification, setWatchlistNotification] = useState(false);
    const [highPriority, setHighPriority] = useState(false);
    const timerRef = useRef(null);


    let storedMovie = watchlist.find(o => o.id === movie.id)
    let storedFavoriteMovie = favorite.find(o => o.id === movie.id)
    let storedWatchedMovie = watched.find(o => o.movie.id === movie.id)




    const handleWatchlistButtonClick = (movie) => {
        if (storedWatchedMovie)
            Removefromwatched(movie.id);
        if (storedFavoriteMovie)
            Removefromfavorite(movie.id);

        if (!storedMovie)
            AddMovieToWatchlist(movie);

        else {
            Removefromwatchlist(movie.id);
        }
    }

    const handleWatchedButtonClick = (movie) => {
        if (storedMovie)
            Removefromwatchlist(movie.id)

        if (!storedWatchedMovie)
            AddMovieToWatched(movie);

        else {
            Removefromwatched(movie.id);
            if (storedFavoriteMovie)
                Removefromfavorite(movie.id);
        }
    }
    const handleFavoriteButtonClick = (movie) => {
        if (storedMovie)
            Removefromwatchlist(movie.id)
        if (!storedWatchedMovie)
            AddMovieToWatched(movie);
        if (!storedFavoriteMovie)
            AddMovieToFavorite(movie);

        else {
            Removefromfavorite(movie.id);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                setFavoriteNotification(false);
            }
        }


    };

    const handleAddToWatched = (movie) => {


        setWatchedNotification(true);



        setTimeout(() => {
            setWatchedNotification(false);
        }, 3000);
    };

    const handlefavoriteNotification = (movie) => {

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setFavoriteNotification(true);



        timerRef.current = setTimeout(() => {
            setFavoriteNotification(false);
        }, 3000);
    };

    const handleWatchlistNotification = (movie) => {

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setWatchlistNotification(true);



        timerRef.current = setTimeout(() => {
            setWatchlistNotification(false);
        }, 3000);
    };


    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setWatchlistNotification(false);
            setFavoriteNotification(false);
            setWatchedNotification(false);
        }, 1000);
    };


    return (
        <><div>
            {watchedNotification && (
                <div className="popup" onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>

                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />
                    <p> added to watched !</p>

                </div>)}
        </div>

            <div>
                {FavoriteNotification && (
                    <div className="popup" onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >

                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />
                        <p> added to Favorites!</p>

                    </div>)}
            </div>

            <div>
                {WatchlistNotification && (
                    <div className="popup" onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>

                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />
                        <pp> added to Watchlist!</pp>
                        <button style={{
                            padding: 0, border: 'none', background: 'none', cursor: 'pointer',
                        }} onClick={(event) => {
                            event.preventDefault();
                            setHighPriority(!highPriority)
                            updatePriority(movie, highPriority);

                        }}>
                            {highPriority ? <span className='count-pill3' > high priority </span> : <span className='count-pill2' > low priority </span>}
                        </button>
                    </div>)}
            </div>

            <div className='priority'>
                {type === "watchlist" && (
                    <button style={{
                        padding: 0, border: 'none', background: 'none', cursor: 'pointer',
                    }} onClick={(event) => {
                        if (movie.priority)
                            updatePriority(movie, !highPriority);
                        else
                            updatePriority(movie, highPriority);

                    }}>

                        {movie.priority ? <span className='count-pill3' >  high priority </span> : <span className='count-pill2' > low priority </span>}
                    </button>
                )}
            </div>
            <div className='inner-card-controls1'>

                {type === "watchlist" && (
                    <>


                        <button className='ctrl-btn'>
                            <i className='fa-fw far fa-eye' onClick={async () => {
                                try {

                                    await AddMovieToWatched(movie);
                                    handleAddToWatched(movie);
                                    setTimeout(async () => {
                                        await Removefromwatchlist(movie.id);
                                    }, 2000);
                                } catch (error) {
                                    console.error("Error:", error);
                                    // Handle errors here
                                }
                            }}></i>
                        </button>


                        <button className='ctrl-btn'>
                            <FontAwesomeIcon icon={regularheart} onClick={async () => {
                                try {

                                    await AddMovieToWatched(movie);
                                    await AddMovieToFavorite(movie);
                                    handlefavoriteNotification(movie);
                                    setTimeout(async () => {
                                        await Removefromwatchlist(movie.id);
                                    }, 2000);
                                } catch (error) {
                                    console.error("Error:", error);
                                    // Handle errors here
                                }
                            }} />
                        </button>

                        <button className='ctrl-btn'
                            onClick={() => Removefromwatchlist(movie.id)}>
                            <i className='fa-fw fa fa-times'></i>
                        </button>



                    </>


                )}
                {type === "home" && (
                    <>


                        <button className='ctrl-btn' onClick={(event) => {
                            console.log(watched)
                            event.preventDefault();
                            handleWatchedButtonClick(movie);

                            if (!storedWatchedMovie)
                                handleAddToWatched(movie);

                        }}>
                            {storedWatchedMovie ? <FontAwesomeIcon icon={faEyeSlash} /> : <i className='fa-fw far fa-eye'></i>}

                        </button>


                        <button className='ctrl-btn' onClick={(event) => {

                            event.preventDefault();
                            handleFavoriteButtonClick(movie);
                            if (!storedFavoriteMovie)
                                handlefavoriteNotification(movie);
                        }}>
                            {storedFavoriteMovie ? <FontAwesomeIcon icon={solidheart} /> : <FontAwesomeIcon icon={regularheart} />}
                        </button>

                        <button className='ctrl-btn' onClick={(event) => {
                            event.preventDefault();
                            handleWatchlistButtonClick(movie);
                            if (!storedMovie)
                                handleWatchlistNotification(movie);
                        }}>
                            {storedMovie ? <FontAwesomeIcon icon={solidclock} /> : <FontAwesomeIcon icon={regularclock} />}
                        </button>


                    </>


                )}
                {type === "watched" && (
                    <>


                        <button className='ctrl-btn' onClick={(event) => {

                            handleFavoriteButtonClick(movie);
                            if (!storedFavoriteMovie)
                                handlefavoriteNotification(movie);
                        }}>
                            {storedFavoriteMovie ? <FontAwesomeIcon icon={solidheart} /> : <FontAwesomeIcon icon={regularheart} />}
                        </button>


                        <button className='ctrl-btn'
                            onClick={() => Removefromwatched(movie.id)}>
                            <i className='fa-fw fa fa-times'></i>
                        </button>



                    </>


                )}

                {type === "favorite" && (
                    <>


                        


                        <button className='ctrl-btn'
                            onClick={() => Removefromfavorite(movie.id)}>
                            <i className='fa-fw fa fa-times'></i>
                        </button>



                    </>


                )}


            </div></>

    )
}


