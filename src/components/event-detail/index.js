import React, { Component } from "react";
import "./event-detail.scss";
import fitness from "../../images/-e-ic_fitness.png";
import food from "../../images/-e-ic_food.png";
import shopping from "../../images/-e-ic_shopping.png";
import SPA from "../../images/-e-ic_SPA.png";
import people from "../../images/user.svg";
import AddReview from "../generic/AddReview";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";
import moment, { relativeTimeRounding } from "moment";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import mapMarker from "../../images/icon/location.svg";
import phone from "../../images/icon/phone.svg";
import clock from "../../images/icon/clock.svg";
import heart from "../../images/heart.svg";
import PlaceHolderImg from "../../images/placeholder.jpg";
import heart_full from "../../images/heart-full (copy).svg";
import twitter_w from "../../images/icon/twitter/white.svg";
import like from "../../images/icon/thumbs-up.svg";
import corn from "../../images/corn.png";
import arrowBack from "../../images/arrow-left.svg";
import { Link } from "react-router-dom";
import { localStore } from "../../services/storage";
import MapContainer from '../map/GoogleMap';
import StarRatings from "react-star-ratings";
import { FacebookProvider, Like } from "react-facebook";
import { ReactComponent as TwitterIcon } from "../../images/icon/twitter.svg";
import { ReactComponent as ThumbsupIcon } from "../../images/icon/thumbs-up.svg";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon
} from "react-share";
import FoodSection from "../../images/category/food-section.png";
import SpaSection from "../../images/category/spa-section.png";
import ShoppingSection from "../../images/category/shopping-section.png";
import FitnessSection from "../../images/category/fitness-section.png";
let CategoryImgUrl;


class EventDetail extends Component {
  constructor(props) {
    super(props);
    // this.peoples = [people, people, people, people, people, people];
    if (props.match.params.id) {
      props.getEventById(props.match.params.id);
    }
    this.state = {
      checkReview: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  changeReviewFlag(val) {
    this.setState({
      checkReview: val
    });
  }
  

  // componentWillUnmount() {
  //   this.props.getEventByIdUnmount();
  // }
  render() {
    const { data } = this.props.event;
    var a = 0;
    const { userdata } = this.props;
    const categories = [
      { name: "food", image: food, path: "/food" },
      { name: "SPA", image: SPA, path: "/SPA" },
      { name: "fitness", image: fitness, path: "/fitness" },
      { name: "shopping", image: shopping, path: "/shopping" }
    ];
    
      data && data.categories && data.categories.name.toLowerCase() === "food"
      ? CategoryImgUrl = FoodSection
      :data && data.categories && data.categories.name.toLowerCase() === "spa"
      ? CategoryImgUrl = SpaSection
      :data && data.categories && data.categories.name.toLowerCase() === "fitness"
      ? CategoryImgUrl = FitnessSection
      :data && data.categories && data.categories.name.toLowerCase() === "shopping"
      ? CategoryImgUrl = ShoppingSection
      : CategoryImgUrl = null
    
    let avgRate,
      sum = 0;
    if (data) {
      data.reviews.forEach(m => (sum += parseInt(m.stars)));
      avgRate = sum / data.reviews.length;
      if (data.reviews.length == 0) {
        avgRate = 0;
      }
    }
    let youInterested;
    if (data && userdata && userdata.data) {
      youInterested = data.interested.find(oneInterested => {
        return oneInterested._id == userdata.data._id;
      });
    }
    const weekSchedule = [
      { start: data && data.sunStartTime, end: data && data.sunEndTime },
      { start: data && data.monStartTime, end: data && data.monEndTime },
      { start: data && data.tueStartTime, end: data && data.tueEndTime },
      { start: data && data.wedStartTime, end: data && data.wedEndTime },
      { start: data && data.thrStartTime, end: data && data.thrEndTime },
      { start: data && data.friStartTime, end: data && data.friEndTime },
      { start: data && data.satStartTime, end: data && data.satEndTime }
    ];
    const d = new Date().getDay();    
    return (
      <>
      <div className="event-detail-page container-fluid">
        {data && data.categories && (
         
          <Link to={{ pathname: `/${data.categories.name}` }}>
            <div className="arrowBack">
              <img src={arrowBack} />
              Back to list
            </div>
          </Link>
        )}
        {data && data.title ? (
          <>
            <div className=" row">
              <div className="col-md-6 col-12 p-0 cover-pic">
                <img className="business-image" src={data && data.image ? data.image.secure_url : PlaceHolderImg} />
                {(data && data.EventLocation && data.EventLocation.length ) &&
                  <div className="map-container"> 
                    <MapContainer
                      info={data.EventLocation}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI"
                      loadingElement={<div style={{ height: `400px` }} />}
                      containerElement={
                        <div className="containerElement" />
                      }
                      mapElement={<div className="mapElement" />}
                    />
                    <div className="get-direction-btn">
                      <span onClick={() =>
                                window.open(
                                  `http://maps.google.com/maps?q=${
                                    data.EventLocation[1]
                                  },${data.EventLocation[0]}&ll=${
                                    data.EventLocation[1]
                                  },${data.EventLocation[0]}&z=10`
                                )
                              }>
                              Get Directions
                      </span>
                    </div>
                </div>}
              </div>
              <div className="col-lg-6 col-md-6 event-detail">
                <div className="eventTitleDiv">
                  {data && data.categories && data.categories.name && (
                    <img
                      src={
                        categories.find(m => {
                          return m.name == data.categories.name;
                        }).image
                      }
                    />
                  )}
                  <h3>{data && data.title}</h3>
                </div>
                {data && (
                  <div className="reviews">
                    <StarRatings
                      rating={avgRate}
                      starRatedColor="#fbc000"
                      numberOfStars={5}
                      name="rating"
                      starDimension="12px"
                      starSpacing="2px"
                    />
                    {data.reviews.length} reviews
                  </div>
                )}
                  <div className="business-description">
                  {data.content && data.content.brief ? 
                    data.content.brief : 
                    "" 
                  }
                  </div>
                <div className="middle">
                  <div className="event-info event-des">
                    <div className="place-detail">
                      <img className="icon" src={mapMarker} />
                      {data && data.EventPlace
                        ? data.EventPlace
                        : " place not decided "}{" "}
                      ,
                      {data && data.EventState && this.props.places.data
                        ? this.props.places.data.find(
                            state => state._id == data.EventState
                          ).name
                        : null}
                    </div>
                    <div className="contact-detail">
                      <img src={phone} className="icon" />
                      {data && data.phone_number
                        ? data.phone_number
                        : "Not available"}
                    </div>
                    {data && (
                      <div className="open-status-detail">
                        <img src={clock} className="icon" />
                        {moment(weekSchedule[d].start, "hh:mm a").format(
                          "HH:mm"
                        ) < moment().format("HH:mm") &&
                        moment(weekSchedule[d].end, "hh:mm a").format("HH:mm") >
                          moment().format("HH:mm")
                          ? "Opened now"
                          : "Closed now"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="weekly-status mr-right">
                <div className="row hours-wrapper-row">
                  <h6 className="col-lg-12 open-hours-title">Opening Hours</h6>
                  {data && (
                    <div className="open-hours row">
                      {/* <h6 className="col-lg-12 open-hours-title-mobile">
                        Open hours
                      </h6> */}
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div>
                          <span className="week-day">Monday</span>
                          <span>
                            {data.monStartTime
                              ? data.monStartTime + " - " + data.monEndTime
                              : "Closed"}
                          </span>
                        </div>
                        <div>
                          <span className="week-day">Tuesday</span>
                          <span>
                            {data.tueStartTime
                              ? data.tueStartTime + " - " + data.tueEndTime
                              : "Closed"}
                          </span>
                        </div>
                        <div>
                          <span className="week-day">Wednesday</span>
                          <span>
                            {data.wedStartTime
                              ? data.wedStartTime + " - " + data.wedEndTime
                              : "Closed"}
                          </span>
                        </div>
                        <div>
                          <span className="week-day">Thursday</span>
                          <span>
                            {data.thrStartTime
                              ? data.thrStartTime + " - " + data.thrEndTime
                              : "Closed"}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                        <div>
                          <span className="week-day">Friday</span>
                          <span>
                            {data.friStartTime
                              ? data.friStartTime + " - " + data.friEndTime
                              : "Closed"}
                          </span>
                        </div>
                        <div>
                          <span className="week-day">Saturday</span>
                          <span>
                            {data.satStartTime
                              ? data.satStartTime + " - " + data.satEndTime
                              : "Closed"}
                          </span>
                        </div>
                        <div>
                          <span className="week-day">Sunday</span>
                          <span>
                            {data.sunStartTime
                              ? data.sunStartTime + " - " + data.sunEndTime
                              : "Closed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="social-interest">
                <div className="favouriteDiv">
                  {data && youInterested ? (
                    <button
                      className="btn add-fav"
                      onClick={() =>{
                          if (localStore("token")) {                                
                            this.props.addInterest({ event_id: data._id })
                          } else {
                            this.props.history.push("/auth/");
                          }
                        }
                      }
                    >
                      <img src={heart_full} className="icon" />
                      Added to Favorites
                    </button>
                  ) : (
                    <button
                      className="btn add-fav"
                      onClick={() =>{
                          if (localStore("token")) {                                
                            this.props.addInterest({ event_id: data._id })
                          } else {
                            this.props.history.push("/auth/");
                          }
                        }
                      }
                    >
                      <img src={heart} className="icon" />
                      Add to Favorites
                    </button>
                  )}
                </div>
                <div
                  className="social d-flex"
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
              
                  <FacebookShareButton
                    url={`http://ec2-18-191-251-253.us-east-2.compute.amazonaws.com/event-detail/${
                      data._id
                    }`}
                    className="fb-share-btn"
                  >
                      <FacebookIcon size={15}/> <div>Share</div>
                  </FacebookShareButton>
                  <TwitterShareButton
                    className="btn btn-primary ml-1 px-1 py-0 d-flex tweet"
                    url={`${window.location.origin}/business-detail/${
                      data._id
                    }`}
                    title=""
                    style={{
                      height: "19px",
                      alignItems: "center",
                      marginTop: "3px"
                    }}
                  >
                    <TwitterIcon width="12px" height="12px" />
                    <div
                      className="twitter-icon"
                      style={{ marginLeft: "5px", fontSize: "10px" }}
                    >
                      Tweet
                    </div>
                  </TwitterShareButton>
                </div>
              </div>
                <div className="users-reviews display-hidded-after-width">
                  <div className="row">
                    <h6 className="col-lg-12">Reviews</h6>
                    <div className="reviews-section col-lg-6 col-sm-6 ">
                      <div className="row">
                        <div style={{ width: "100%" }}>
                          <AddReview
                            event_id={data && data._id}
                            addReviewRequest={this.props.addReviewRequest}
                            data={data}
                            userdata={this.props.userdata}
                            checkPoint={this.state.checkReview}
                            changeReviewFlag={val => {
                              this.changeReviewFlag(val);
                            }}
                            history={this.props.history}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="category-img text-center col-lg-6 col-sm-6 ">
                      <div className="image">
                        <img src={CategoryImgUrl} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row display-after-width">
              <div className="col-lg-6 col-md-6  users-reviews">
                <div className="row">
                  <h6 className="col-lg-12">Reviews</h6>
                  <div className="reviews-section col-lg-6 col-sm-6 ">
                    <div className="row">
                      <div style={{ width: "100%" }}>
                        <AddReview
                          event_id={data && data._id}
                          addReviewRequest={this.props.addReviewRequest}
                          data={data}
                          userdata={this.props.userdata}
                          checkPoint={this.state.checkReview}
                          changeReviewFlag={val => {
                            this.changeReviewFlag(val);
                          }}
                          history={this.props.history}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="category-img text-center col-lg-6 col-sm-6 ">
                    <div className="image">
                      <img src={CategoryImgUrl} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          this.props.isLoading &&
          !data && (
            <div className="loader-div" style={{ margin: "40px auto" }}>
              <Loader type="Oval" color="#555" height="30" width="100vw" />
            </div>
          )
        )}
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.eventById.data,
  places: state.event.locations.data,
  userdata: state.auth.userdata.data,
  // addComment: state.event.addComment
  isLoading: state.event.eventById.isLoading,
  review: state.event.addReview
});

const mapDispatchToProps = dispatch => ({
  // addCommentRequest: data => dispatch(actions.addCommentRequest(data)),
  getEventById: data => dispatch(actions.getEventByIdRequest(data)),
  addReviewRequest: data => dispatch(actions.addReviewRequest(data)),
  addInterest: id => dispatch(actions.addInterestRequest(id))
  // addEvent: ()=> dispatch(actions.addEventRequest()),
  // getEventByIdUnmount: () => dispatch(actions.getEventByIdUnmount()),
  // likeComment: data => dispatch(actions.likeCommentRequest(data)),
  // unlikeComment: data => dispatch(actions.unlikeCommentRequest(data)),
  // sharePost: post_id => dispatch(actions.sharePost(post_id)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventDetail)
);
