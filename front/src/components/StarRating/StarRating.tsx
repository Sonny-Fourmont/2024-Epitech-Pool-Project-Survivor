/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** starRating
 */

import React, { useState } from 'react';
import './StarRating.css';

type StarRatingProps = {
  maxStars?: number;
  initialRating?: number;
};

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  initialRating = 0,
}) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
  };

  return (
    <div className="star-rating">
      {Array.from({ length: maxStars }, (_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${rating >= ratingValue ? 'filled' : ''}`}
            onClick={() => handleClick(ratingValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
