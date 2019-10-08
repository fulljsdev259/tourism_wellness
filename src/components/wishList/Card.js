import React, { Component } from "react";
import placeholder_img from "../../images/placeholder.jpg";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import mapMarker from "../../images/icon/location.svg";
import phone from "../../images/icon/phone.svg";
import clock from "../../images/icon/clock.svg";
import moment from "moment";
import heart from "../../images/heart.svg";
import heart_full from "../../images/heart-full.svg";
import { localStore } from "../../services/storage";

export default class Card extends Component {
  render() {
    let {
      image,
      id,
      title,
      cardData,
      phone_number,
      EventPlace,
      userData,
      reviews
    } = this.props;

    let youInterested;
    if (userData && userData.data) {
      youInterested = cardData.interested.find(oneInterested => {
        return oneInterested._id == userData.data._id;
      });
    }

    let avgRate,
      sum = 0;
    if (cardData) {
      reviews.forEach(m => (sum += parseInt(m.stars)));
      avgRate = sum / reviews.length;
      if (reviews.length == 0) {
        avgRate = 0;
      }
    }
    const weekSchedule = [
      { start: cardData.start, end: cardData.end },
      { start: cardData.start, end: cardData.end },
      { start: cardData.start, end: cardData.end },
      { start: cardData.start, end: cardData.end },
      { start: cardData.start, end: cardData.end },
      { start: cardData.start, end: cardData.end },
      { start: cardData.start, end: cardData.end }
    ];

    const d = new Date().getDay();
    return (
      <div className="events-list">
        <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12  offset-md-1 offset-lg-2 event-img">
          <div
            className="img"
            style={{
              backgroundImage: `url(${image || placeholder_img})`,
              backgroundSize: "cover"
            }}
          />
        </div>

        <div className="col-lg-5 col-md-6 col-sm-6 col-sm-12 col-xs-12  event-detail">
          <div className="head">
            <div>
              <Link to={{ pathname: `/business-detail/${id}` }}>
                <div className="title">{title}</div>
              </Link>
              <div className="mobile-social">
                <img
                  className="wishlist"
                  src={youInterested ? heart_full : heart}
                  title={localStore("token") ? null : "Login first "}
                  onClick={() => {
                    if (localStore("token")) {
                      this.props.addInterest({
                        id: id,
                        pathname: this.props.location.pathname
                      });
                    } else {
                      this.props.history.push("/auth");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="reviews">
            <StarRatings
              rating={avgRate}
              starRatedColor="#fbc000"
              starDimension="0.8em"
              starSpacing="0px"
              numberOfStars={5}
              name="rating"
            />
            <div
              className="reviews-count"
              style={{ fontSize: "12px", marginLeft: "10px", color: "#808080" }}
            >
              {reviews.length} reviews
            </div>
          </div>
          <div className="middle">
            <div className="event-des">
              {cardData && cardData.content && cardData.content.brief
                ? cardData.content.brief
                : `Loremm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt vitae semper quis lectus nulla. Volutpat odio facilisis mauris sit amet massa vitae tortor.`}{" "}
            </div>

            <div className="icon-div">
              <img className="icon" src={mapMarker} />
              {EventPlace ? EventPlace + " " : "place not disclosed"}
              {/* {event && event.EventState && this.props.places.data
                      ? this.props.places.data.find(
                          state => state._id == event.EventState
                        ).name
                      : null} */}
            </div>
            <div className="row ">
              <div className="icon-div col-md-12 col-6">
                <img src={phone} className="icon" />
                {phone_number ? phone_number : "123456789"}
              </div>
              <div
                style={{ float: "left" }}
                className="icon-div col-md-12 col-6"
              >
                <div className="open-status-detail">
                  <img src={clock} className="icon" />
                  {moment(weekSchedule[d].start, "hh:mm a").format("HH:mm") <
                    moment().format("HH:mm") &&
                  moment(weekSchedule[d].end, "hh:mm a").format("HH:mm") >
                    moment().format("HH:mm")
                    ? "Opened now"
                    : "Closed now"}
                </div>
              </div>
            </div>

            <div />
            <div />
            <div className="social">
              {/* <img
                      className="wishlist"
                      src={youInterested ? heart_full : heart}
                      title={localStore("token") ? null : "Login first "}
                      onClick={() => {
                        if (localStore("token")) {
                          this.props.addInterest({
                            id: id,
                            pathname: this.props.location.pathname
                          });
                        } else {
                          this.props.history.push("/auth");
                        }
                      }}
                    /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
