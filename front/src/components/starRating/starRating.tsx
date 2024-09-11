/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** starRating
 */

import React, { useState } from 'react';
import '../../CSSStarRating.css';

type StarRatingProps = {
  maxStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
    if (onRatingChange) {
      onRatingChange(ratingValue);
    }
  };
  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating">
      {Array.from({ length: maxStars }, (_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${
              (hoverRating || rating) >= ratingValue ? 'filled' : ''
            }`}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
