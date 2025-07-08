import React, { useContext , useState} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { ReviewsCard } from './ReviewsCard';
import { SearchBar } from './SearchBar'
import { FloatingButton } from './floatingbutton/FloatingButton'
import "./review1.css"
export const Reviews = () => {
  const { reviewlist } = useContext(GlobalContext)
  const reversedlist = [...reviewlist].reverse();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  console.log(reversedlist)

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prevVisible) => !prevVisible);
    console.log(isSearchBarVisible)
  };


  return (
    <>
    {isSearchBarVisible && <SearchBar type = 'review' />}
      <div className='movie-page'>
        <div className='container'>
        <div className='header'>
          <h2 className='heading' >Reviews</h2>
          <span className='count-pill' >{reversedlist.length}{reversedlist.length === 1 ? " Movie" : " Movies"}  </span>
        </div>
      </div>
      

      {reviewlist.length > 0 ? (
        <div className="reviews-container" >
          {reversedlist.map((review) => (

            <ReviewsCard movie={review.movie} review={review.review} rating={review.rating} type ='reviews' />
          ))}
        </div>
      ) : (
        <h2 className='no-movies'>No movies in your reviewlist</h2>
      )}

    </div>
    <FloatingButton onClick={toggleSearchBar} />
    </>

  )
}

