import React, { useState } from 'react';
import  "./modal.css"
import  "./review.css"

 function ReviewModal({ isOpen, onClose, onSaveReview, movieDetails }) {
  const [reviewText, setReviewText] = useState('');

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSaveReview = () => {
    onSaveReview(reviewText,rating);
    setReviewText('');
    onClose();
  };

  const [rating, setRating] = useState(null); // Set default rating value

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value)); // Update rating state based on user selection
  };


  return (
    
    <div className={`review-modal ${isOpen ? 'open' : ''}`}>
  
    <span className="close-button" onClick={onClose}>
      &times;
    </span>
    {movieDetails && (
      <div className="movie_carddd" id="bright">
        <div className="info_section">
          <div className="movie_header">
            <img
              className="locandina"
              src={movieDetails.image}
            />
            <h1 style={{marginRight : '130px',marginTop: "0px"}}>{movieDetails.title}</h1>
            <h4>
              {movieDetails.releaseYear}
            </h4>
            <span className="minutes">{movieDetails.runtime} min</span>
            {/* <p className="type">{movieDetails.genres.join(', ')}</p> */}
          </div>
          <div className="movie_desc">
            <textarea
              className="review-text"
              value={reviewText}
              onChange={handleReviewTextChange}
              placeholder="Write your review here"
            />
            <fieldset className="rating">
      <input type="radio" id="star5" name="rating" value={5} checked={rating === 5} onChange={handleRatingChange} />
      <label className="full" htmlFor="star5" ></label>
      <input type="radio" id="star4half" name="rating" value={4.5} checked={rating === 4.5} onChange={handleRatingChange} />
      <label className="half" htmlFor="star4half" ></label>
      <input type="radio" id="star4" name="rating" value={4} checked={rating === 4} onChange={handleRatingChange} />
      <label className="full" htmlFor="star4" ></label>
      <input type="radio" id="star3half" name="rating" value={3.5} checked={rating === 3.5} onChange={handleRatingChange} />
      <label className="half" htmlFor="star3half" ></label>
      <input type="radio" id="star3" name="rating" value={3} checked={rating === 3} onChange={handleRatingChange} />
      <label className="full" htmlFor="star3" ></label>
      <input type="radio" id="star2half" name="rating" value={2.5} checked={rating === 2.5} onChange={handleRatingChange} />
      <label className="half" htmlFor="star2half" ></label>
      <input type="radio" id="star2" name="rating" value={2} checked={rating === 2} onChange={handleRatingChange} />
      <label className="full" htmlFor="star2" ></label>
      <input type="radio" id="star1half" name="rating" value={1.5} checked={rating === 1.5} onChange={handleRatingChange} />
      <label className="half" htmlFor="star1half" ></label>
      <input type="radio" id="star1" name="rating" value={1} checked={rating === 1} onChange={handleRatingChange} />
      <label className="full" htmlFor="star1" ></label>
      <input type="radio" id="star0half" name="rating" value={0.5} checked={rating === 0.5} onChange={handleRatingChange} />
      <label className="half" htmlFor="star0half" ></label>
      
      
    </fieldset>
    
            <button onClick={handleSaveReview} style={{height:'60px', marginTop:'0px', fontSize: '15px'}}>Save Review</button>
          </div>
        </div>
        <div className="blur_back bright_back" style={movieDetails.backgroundStyle}></div>
      </div>
    )}
  </div>

    
  );
}

export default ReviewModal;
