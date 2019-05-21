import React from 'react';
import PropTypes from 'prop-types';


export default function Summary(props) {
  const { totalReviews } = props;
  const { summary } = props;
  return (
    <div id="summary">
      <div className="header">
        <h4>What {totalReviews} People Are Saying</h4>
      </div>
      <div className="sub-header">
        <p>Overall ratings and reviews</p>
      </div>
      <div className="center">
        <div className="left">
          <div id="overallStars">
            <div id="stars"></div>
            <p id="overallStars">{summary.averageOverall} based on recent ratings</p>
          </div>
          <div id="overallRatings">
            <div id="food">
              <p className="rating">{summary.averageFood}</p>
              <p>Food</p>
            </div>
            <div id="service">
              <p className="rating">{summary.averageService}</p>
              <p>Service</p>
            </div>
            <div id="ambience">
              <p className="rating">{summary.averageAmbience}</p>
              <p>Ambience</p>
            </div>
            <div id="value">
              <p className="rating">{summary.valueRating}</p>
              <p>Value</p>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

Summary.propTypes = {
  totalReviews: PropTypes.number.isRequired,
  summary: PropTypes.object.isRequired
};


// /* <div id="reviews-summary">
// <div className="reviews-header">What {totalReviews} People Are Saying</div>
// <div id="reviews-summary-main">
//   <div id="reviews-summary-left-column">
//     <div className="reviews-subheader-bold">Overall ratings and reviews</div>
//     <div className="reviews-summary-text-large">Reviews can only be made by diners who have eaten at this restaurant</div>
//     <div id="reviews-summary-stars">
//       <div className="review-star" />
//     </div>
//     <div id="reviews-summary-average-ratings">
//       {/* include average ratings with correct borders between */}
//       <span>{summary.averageOverall} based on recent ratings</span>
//     </div>
//     <div id="reviews-summary-noise">
//       <div className="noise-icon" />
//       <span> Noise · {summary.noise}</span>
//     </div>
//     <div id="reviews-summary-recommendation-percent">
//       <div id="thumb-icon" />
//       <span>{summary.recommendPercent}% of people would recommend it to a friend.</span>
//     </div>
//     {/* use exzerone search api for location href? */}
//     <a id="reviews-summary-best-link" href="#">Best Restaurants in {summary.location}</a>
//   </div>
//   <div id="reviews-summary-right-column">
//     <div id="reviews-rating-bars">Bars go here</div>
//   </div>
// </div>
// </div>