import React, { Component } from "react";
import photo from "../../images/photo2.png";
// import jamrock from "../../images/jamrock.png";
// import band from "../../images/band.png";
import cost from "../../images/cost.png";
import inactiveCost from "../../images/cost-not-active.svg";
import web from "../../images/web.png";
import time from "../../images/time.png";
import mapMain from "../../images/map-main-color.svg";
// import share from "../../images/share.svg";
import heart from "../../images/heart.svg";
import heart_full from "../../images/heart-full.svg";
// import people from "../../images/interested-people.png";
import { Link } from "react-router-dom";
import moment from "moment";
import { sharePost, addInterestRequest } from "../../redux/actions";
import { connect } from "react-redux";
// import { getInterestPeople } from "../../services/helper";
import { localStore } from "../../services/storage";
// import { getgradient } from "../../services/helper";
import { withRouter } from "react-router-dom";
import mapMarker from "../../images/icon/location.svg";
import phone from "../../images/icon/phone.svg";
import clock from "../../images/icon/clock.svg";
import StarRatings from "react-star-ratings";
import "./EventItem.scss";

class EventItem extends Component {
  constructor(props) {
    super(props);
  }
  showDetails = () => {
    const { event } = this.props;
    this.props.history.push({
      pathname: `/business-detail/${event._id}`,
      state: event
    });
  };
  render() {
    const { event, userdata } = this.props;
    let avgRate,
      sum = 0;
    if (event) {
      event.reviews.forEach(m => (sum += parseInt(m.stars)));
      avgRate = (sum / event.reviews.length);
      if(event.reviews.length==0){
        avgRate =0;
      }
    }
    const getZIndex = i => {
      return event.interested.length * 10 - i;
    };
    let interestPeople = "";
    let youInterested;
    if (event && userdata && userdata.data) {
      youInterested = event.interested.find(oneInterested => {
        return oneInterested._id == userdata.data._id;
      });
    }
    return (
      <div className="events-list">
        <div
          className={
            "col-lg-3 col-md-4 col-sm-10 col-xs-12 offset-sm-1 offset-md-1 offset-lg-2 event-img"
          }
        >
          {/* <Link to={{ pathname: `/event-detail/${event._id}`, state: event }}> */}
          <div
            className="img"
            style={{
              backgroundImage: `url(${event.image ? event.image.url : photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          {/* </Link> */}
        </div>
        <div
          className={
            "col-lg-5 col-md-6 col-sm-10 offset-sm-1 offset-md-0 event-detail"
         }
        >
          <div className="head">
            <div>
              <Link
                to={{ pathname: `/business-detail/${event._id}`, state: event }}
              >
                <div className="title" onClick={this.showDetails}>
                  {event.title}
                </div>
              </Link>
              <div className="mobile-social">
                <img
                  className="wishlist"
                  src={
                    userdata.data &&
                    event.interested.find(
                      oneInterested => oneInterested._id === userdata.data._id
                    )
                      ? heart_full
                      : heart
                  }
                  title={
                    localStore("token") ? null : "Login first if interested"
                  }
                  onClick={() => {
                    if (localStore("token")) {
                      this.props.addInterest({
                        _id: event._id,
                        pathname: this.props.location.pathname
                      });
                    }else {
                      this.props.history.push("/auth/");
                    }
                  }}
                />
                {/* <img
                  className="share"
                  //   src={share}
                  onClick={() => {
                    this.props.sharePost(event);
                    document.getElementById("shareMenu").style.top = "0px";
                  }}
                /> */}
              </div>
            </div>
          </div>

          <div className="row mobile-head">
            <div className="mobile-title">
              <div>
                <Link
                  to={{ pathname: `/business-detail/${event._id}`, state: event }}
                >
                  <div className="title" onClick={this.showDetails}>
                    {event.title}
                  </div>
                </Link>
              </div>
            </div>
            <div className="mobile-favorite">
              <img
                className="mobile-wishlist"
                src={youInterested ? heart_full : heart}
                onClick={() => {
                  if (localStore("token")) {
                    this.props.addInterest({
                      event_id: event._id,
                      id: event.categories._id
                    });
                  }else{
                    this.props.history.push("/auth/");
                  }
                }
              }
              />
            </div>
          </div>
          <div className="reviews">
            <span>
              <StarRatings
                rating={avgRate}
                starRatedColor="#fbc000"
                numberOfStars={5}
                name="rating"
                starDimension="12px"
                starSpacing="2px"
              />
            </span>
            <span>{event && event.reviews.length} reviews</span>
          </div>

          <div className="middle">
            <div className="event-des">
              {event && event.content
                ? event.content.brief
                : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt vitae semper quis lectus nulla. Volutpat odio facilisis mauris sit amet massa vitae tortor.`}{" "}
              {/* <span className="span">
                <img className="icon" src={mapMain} />{" "}
                {event.EventPlace ? event.EventPlace : "Not Decided"}
              </span>
              <span className="span">
                {event.Price ? (
                  <>
                    <img className="icon" src={cost} />{" "}
                    {`from $ ${event.Price}`}
                  </>
                ) : (
                  <>
                    <img className="icon" src={inactiveCost} /> Sold out{" "}
                  </>
                )}
              </span> */}
            </div>

            <div
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   margin: "5px 0"
              // }}
              className="event-dtl"
            >
              <img className="icon" src={mapMarker} />
              {event && event.EventPlace
                ? event.EventPlace
                : " place not decided "}{" "}
              ,
              {event.EventState && this.props.places.data
                ? this.props.places.data.find(
                    state => state._id == event.EventState
                  ).name
                : null}
              {/* <img className="icon" src={mapMain} /> */}
            </div>
            <div className="row">
              <div className="mobile-phone col-lg-12 col-6">
                <img src={phone} className="icon" />
                {event.phone_number ? event.phone_number : "number not available"}
              </div>

              <div
                style={{ float: "left" }}
                className="mobile-time  col-lg-12 col-6"
              >
                <img src={clock} className="icon" />
                {moment(event.start).format("hh:mm:A") <
                  moment().format("hh:mm:A") &&
                moment(event.end).format("hh:mm:A") > moment().format("hh:mm:A")
                  ? "Opened now"
                  : "Closed now"}
              </div>
            </div>
            <div>
              {/* <span className="span"> */}
              {/* <img className="icon" src={mapMain} />{" "}
                {event.EventPlace ? event.EventPlace : "Not Decided"} */}
              {/* </span> */}
              {/* <span className="span">
                {event.Price ? (
                  <>
                    <img className="icon" src={cost} />{" "}
                    {`from $ ${event.Price}`}
                  </>
                ) : (
                  <>
                    <img className="icon" src={inactiveCost} /> Sold out{" "}
                  </>
                )}
              </span> */}
            </div>
            <div>
              {/* <span className="span web-color">
                <img className="icon" src={web} />{" "}
                {event.website ? event.website : "website.com"}
              </span> */}
              {/* <span className="span">
                <img className="icon" src={time} />{" "}
                {event.start && moment(event.start).format("hh:mm A")}
              </span> */}
            </div>
            <div className="social">
              {/* {event.interested.slice(0, 5).map((p, i) => {
                return (
                  <React.Fragment key={i}>
                    <img
                      className="inner"
                      style={{
                        marginLeft: `${i * 10}px`,
                        zIndex: getZIndex(i)
                      }} 
                       src={people}
                    /> */}
              {/* } */}
              {/* </React.Fragment>
                );
              })} */}
              {/* <span className="peopleCount">{interestPeople}</span> */}
              <img
                className="wishlist"
                src={youInterested ? heart_full : heart}
                onClick={() => {
                  if (localStore("token")) {
                    this.props.addInterest({
                      event_id: event._id,
                      id: event.categories._id
                    });
                  }else{
                    this.props.history.push("/auth/");
                  }    
                }}
              />
              {/* <img
                className="share"
                // src={share}

                onClick={() => {
                  this.props.sharePost(event);
                  document.getElementById("shareMenu").style.top = "0px";
                }}
              /> */}
            </div>
          </div>
          {/* <div className="bottom">
            <Link
              to={{ pathname: `/event-detail/${event._id}`, state: event }}
              style={
                {
                  // backgroundImage: getgradient("/" + event.categories.name)
                }
              }
            >
              view details
            </Link>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata.data,
  places: state.event.locations.data
  // reviews:state.event.reviews.data,
});

const mapDispatchToProps = dispatch => ({
  addInterest: data => dispatch(addInterestRequest(data))
  //   sharePost: post_id => dispatch(sharePost(post_id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventItem)
);
