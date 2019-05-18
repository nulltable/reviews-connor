import React from 'react';
import Summary from './summary.jsx';
import Sorting from './sorting.jsx';
import ReviewList from './reviewList.jsx';

export default class ReviewsModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: null,
      reviews: []
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.getSummaryData = this.getSummaryData.bind(this);
    this.getReviewsData = this.getReviewsData.bind(this);
  }

  componentWillMount() {
    this.getSummaryData();
    this.getReviewsData();
  }

  getSummaryData() {
    fetch('http://localhost:3010/2/impression')
      .then(response => response.json())
      .then(summaryData => (
        this.setState({
          summary: summaryData
        })
      ))
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewsData() {
    fetch('http://localhost:3010/2/reviews')
      .then(response => response.json())
      .then(reviewsData => (
        this.setState({
          reviews: reviewsData
        })
      ))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { summary } = this.state;
    const { reviews } = this.state;
    return (
      <div className="reviews">
        <Summary summary={summary} />
        <Sorting />
        <ReviewList reviews={reviews} />
      </div>
    );
  }
}
