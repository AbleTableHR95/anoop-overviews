import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ReviewsOverview.css';
import icons from '../icons.jsx';

const ReviewsOverview = props => (
  <div id="reviewsOverviewComponent">
    <div className={styles.avgReviewContainer}>
      <img src="overview/star-rating.png" alt="" width="70" height="30"></img>
      <span className={styles.avgReview}>4.5</span>
    </div>
    <div className={styles.totalReviewsContainer}>
      <span className="fa fa-comments"></span>
      <span className={styles.totalReviews}>333 reviews</span>
    </div>
    <div className={styles.priceRangeContainer}>
      <span className="fa fa-money"></span>
      <span className={styles.priceRange}>{props.priceRange}</span>
    </div>
    <div className={styles.cuisineTypeContainer}>
      <span className="cutlery">{icons.cuisineSmall}</span>
      <span className={styles.cuisineType}>{props.cuisine}</span>
    </div>
  </div>
);

ReviewsOverview.propTypes = {
  priceRange: PropTypes.string,
  cuisine: PropTypes.string,
};

export default ReviewsOverview;
