import React from 'react';


export const RatingsHistogram = ({ ratings }) => {
    // Assuming ratings is an array of numbers
    const counts = {};
  
    // Count occurrences of each rating
    ratings.forEach((rating) => {
      const key = Math.floor(rating * 2) / 2; // Round to nearest half
      counts[key] = (counts[key] || 0) + 1;
    });
  
    return (
      <div className="ratings-histogram">
        {Object.keys(counts).map((key) => (
          <div
            key={key}
            className="histogram-bar"
            style={{ height: `${counts[key] * 20}px` }} // Adjust the height as needed
          >
            {key}
          </div>
        ))}
      </div>
    );
  };
  