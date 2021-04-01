import React from 'react';
import "../styles/favorites.css";

const maxStars = 5;

const Rating = ({ children }) => {
  const rating = Math.round(Number(children));

  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < rating) {
      stars.push(<span key={i} className="star">★</span>);
    } else {
      stars.push(<span key={i} className="star">☆</span>);
    }
  }

  return <div>{stars}</div>;
};

export default Rating;
