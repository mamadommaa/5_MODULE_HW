
import React, { useState } from 'react';
import "./Rest.css";

interface RestProps {
  id: string;
  name: string;
  description: string;
  raiting: number;
  url: string;
  onRatingChange: (id: string, rating: number) => void; 
}

const STAR_COUNT = 5;

export const Rest: React.FC<RestProps> = ({ id, name, description, raiting, url, onRatingChange }) => {
  const [currentRating, setCurrentRating] = useState(raiting);

  const handleClick = (rating: number) => {
    setCurrentRating(rating);
    onRatingChange(id, rating);
  };

  return (
    <div className='rest'>
      <img className='rest__img' src={url} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <div className='rating'>
        {[...Array(STAR_COUNT)].map((_, index) => {
          const starRating = index + 1;
          const isFilled = starRating <= currentRating;
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFilled ? "gold" : "gray"}
              onClick={() => handleClick(starRating)}
              style={{ cursor: 'pointer', margin: '0 2px' }}
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"/>
            </svg>
          );
        })}
      </div>
    </div>
  );
};

