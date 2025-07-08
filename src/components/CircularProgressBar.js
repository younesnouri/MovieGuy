import React from 'react';

export const CircularProgressBar = ({ size, strokeWidth, rating }) => {
  // Convert rating out of 5 to a percentage
  const percentage = (rating / 5) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          stroke="#eee" // Background circle color
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: 0 }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#ffc107" // Progress bar color (yellow for example)
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.6s ease 0s' }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '1.5rem',
        }}
      >
        <span style={{ marginRight: '0.25rem' }}>★</span>
        {rating.toFixed(1)}
      </div>
    </div>
  );
};




