import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = ({ teacherId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`/api/reviews/${teacherId}`)
      .then(response => setReviews(response.data))
      .catch(error => console.error(error));
  }, [teacherId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/reviews/${teacherId}`, { rating, comment }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setReviews([...reviews, response.data]);
        setRating(0);
        setComment('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
            <p>By: {review.user.name}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;
