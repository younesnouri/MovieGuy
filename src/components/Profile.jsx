import React, { useContext, useState, useEffect, useRef } from 'react'
import "./figma/style1.css";
import { GlobalContext } from '../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidheart } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faClock as regularclock } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from './AuthProvider'
import { HomeCards } from './HomeCards'
import { Moviecard } from './Moviecard';
import { Navbar } from './Navbar';
import { ReviewsCard } from './ReviewsCard';
import { Placeholder } from './Placeholder';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { RatingsGraph } from './RatingsGraph';
import { RatingsHistogram } from './RatingsHistogram';
import { BarChart } from './BarChart';
import { ImageCollection } from './imagecollection/ImageCollection';
//import { CircularProgressBar } from './CircularProgressBar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Search } from 'semantic-ui-react';
import { SearchExampleStandardCustom } from './SearchExampleStandardCustom'
import { SearchBarUsers } from './SearchBarUsers';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

  const [searchclick, SetSearchclick] = useState(false)
  const handlesearchclick = () => {
    SetSearchclick(true)

  }

  const { user } = useAuth();
  const { watched, watchlist, favorite, reviewlist, activity } = useContext(GlobalContext);
  //const image = require("./images/driveimg.jpg")
  console.log(activity)
  const [activeTab, setActiveTab] = useState('section1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const reversedactivity = [...activity].reverse();
  console.log("reversedactivityoriginal", reversedactivity)
  const reversedreviews = [...reviewlist].reverse();

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


  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOverlayClick = () => {
    setSearchTerm('');
  }
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/search?term=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setError('Failed to fetch search results');
        console.error('There was an error!', error);
      }

      setIsLoading(false);
    };

    // Debouncing: Introduce a delay before the search is performed
    const delayDebounce = setTimeout(() => {
      performSearch();
    }, 300); // 300ms delay

    // Cleanup function to cancel the timeout if the component unmounts
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const navigate = useNavigate();  // Hook to handle navigation

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`); // Navigate to user profile page
  };


  const [image, setImage] = useState('./images/default.jpg'); // Default image or state
  const fileInput = useRef(null);  // Using useRef to create a reference to the input element

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Call function to handle upload
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/upload-image', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <>

      <div className='pagecontainer'>
        <div className='main1'>
          <div class="boxb">
            
          <FontAwesomeIcon icon={faUser} size="3x" style={{ color: 'white' }} />

            <div class="text" style={{marginRight: '150px'}}>

              <h2 class="topic-heading" style={{color: 'white'}}>{user.username}</h2>
              
              <h2 class="topic" style={{color: 'white', fontStyle:'italic'}}>member since April 2024</h2>

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
              <h2 className='heading' style={{ color: 'white' }} >Recent Reviews</h2>
              {reviewlist.length > 0 ? (
                <div className="reviews-container" style={{ marginLeft: '1px' }}>
                  {reversedreviews.slice(0, 3).map((review) => (

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

          <div className='input-wrapperr'>
            <input type='text' placeholder='Search for users'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

            />
          </div>

          {searchResults.length > 0 &&
            <div className='add-popup'>

              <div className="search-results">
                {searchResults.map((user, index) => (
                  <div key={index} onClick={() => handleUserClick(user.username)}>{user.username}</div> // Adjust according to your user object properties
                ))}
              </div>

            </div>
          }

          <div class="box-container">

            <div class="box box1">
              <div class="text">
                <h2 class="topic-heading">{watchlist.length}</h2>
                <h2 class="topic">Watchlist</h2>

              </div>
              <FontAwesomeIcon icon={regularclock} size="3x" style={{ color: 'white' }} />

            </div>

            <div class="box box2">
              <div class="text">
                <h2 class="topic-heading">{watched.length}</h2>
                <h2 class="topic">Watched</h2>

              </div>
              <FontAwesomeIcon icon={faEye} size="3x" style={{ color: 'white' }} />

            </div>

            <div class="box box3">
              <div class="text">
                <h2 class="topic-heading">{favorite.length}</h2>
                <h2 class="topic">Favorites</h2>
              </div>
              <FontAwesomeIcon icon={solidheart} size="3x" style={{ color: 'white' }} />

            </div>




          </div>
          <div className='movie-page' style={{ marginLeft: '20px' }}>
            <h2 className='heading' >Favorites</h2>
          </div>
          <div className='movie-grid' style={{ marginLeft: '20px' }} >
            {favorite?.slice(0, 4).map((movie) => (
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
                    <h2 className='heading' style={{ fontSize: '1.0em', color: 'white' }}>You added {reversedactivity.movie.title} to your watchlist. <span style={{ fontStyle: 'italic', color: 'grey' }}>{getTimeDifference(reversedactivity.timestamp)}</span> </h2>
                  </div>
                )}

                {reversedactivity.activity_type === 'added_to_watched' && (
                  <div className='boxs' style={{ marginLeft: '20px' }}>
                    <h2 className='heading' style={{ fontSize: '1.0em', color: 'white' }}>You watched {reversedactivity.movie.title}. <span style={{ fontStyle: 'italic', color: 'grey' }}>{getTimeDifference(reversedactivity.timestamp)}</span></h2>
                  </div>
                )}
                {reversedactivity.activity_type === 'added_to_favorites' && (
                  <div className='boxs' style={{ marginLeft: '20px' }}>
                    <h2 className='heading' style={{ fontSize: '1.0em', color: 'white' }}>You added {reversedactivity.movie.title} to your favorites. <span style={{ fontStyle: 'italic', color: 'grey' }}>{getTimeDifference(reversedactivity.timestamp)}</span></h2>
                  </div>
                )}
                {reversedactivity.activity_type === 'added_to_reviews' && (
                  <div className='boxs' style={{ marginLeft: '20px' }}>
                    <h2 className='heading' style={{ fontSize: '1.0em', color: 'white' }}>You rated {reversedactivity.movie.title}  {renderStars(reversedactivity.rating)}. <span style={{ fontStyle: 'italic', color: 'grey' }}>{getTimeDifference(reversedactivity.timestamp)}</span></h2>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}



