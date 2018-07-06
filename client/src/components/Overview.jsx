import React from 'react';
import axios from 'axios';
import ReviewsOverview from './ReviewsOverview.jsx';
import TopTags from './TopTags.jsx';
import Description from './Description.jsx';
import RestaurantInfo from './RestaurantInfo.jsx';
import styles from '../styles/Overview.css';
import styles2 from '../styles/RestaurantInfo.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      displayAll: false,
    };
    this.getInitialData();
    this.toggleDisplayAll = this.toggleDisplayAll.bind(this);
  }

  getInitialData() {
    axios.get(`/restaurant/${this.props.match.params.restaurantId}/overview`)
      .then((response) => {
        this.setState({
          restaurant: response.data,
        });
      })
      .catch(err => console.error(err));
  }

  toggleDisplayAll() {
    const restaurantInfoDiv = document.getElementById('restaurantInfo');
    restaurantInfoDiv.classList.toggle(styles2.hidden);
    this.setState({
      displayAll: !this.state.displayAll,
    });
  }

  render() {
    if (this.state.restaurant.name !== 'QueryResultError' && Object.keys(this.state.restaurant).length !== 0) {
      return (
        <div className={`card border-0 rounded-0 ${styles.overviewMod}`}>
          <div className={`card-body ${styles['card-body']}`}>
            <h1 className={styles.overviewTitle}>{this.state.restaurant.rest_name}</h1>
            <ReviewsOverview priceRange={this.state.restaurant.price_range} cuisine={this.state.restaurant.cuisine} />
            <TopTags tags={this.state.restaurant.tags} />
            <Description description={this.state.restaurant.description} />
            <RestaurantInfo restaurant={this.state.restaurant} displayAll={this.state.displayAll} />
            {!this.state.displayAll ? <div className={styles.fade}>&nbsp;</div> : null}
          </div>
          <div>
            <div className={styles.displayAllBtn} onClick={this.toggleDisplayAll}>
              {this.state.displayAll ? 'View less details' : 'View all details'}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div> There is no restaurant for restaurant id {this.props.match.params.restaurantId}</div>
    );
  }
}

export default Overview;
