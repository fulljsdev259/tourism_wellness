// import React, { Component } from "react";
// import placeholder_img from "../../images/placeholder.jpg";
// // import jamrock from "../../images/jamrock.png";
// // import band from "../../images/band.png";
// import cost from "../../images/cost.png";
// import inactiveCost from "../../images/cost-not-active.svg";
// import web from "../../images/web.png";
// import time from "../../images/time.png";
// import mapMain from "../../images/map-main-color.svg";
// // import share from "../../images/share.svg";
// import heart from "../../images/heart.svg";
// import heart_full from "../../images/heart-full_g.svg";
// // import people from "../../images/interested-people.png";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import { sharePost, addInterestRequest } from "../../redux/actions";
// import { connect } from "react-redux";
// // import { getInterestPeople } from "../../services/helper";
// import { localStore } from "../../services/storage";
// // import { getgradient } from "../../services/helper";
// import { withRouter } from "react-router-dom";
// import mapMarker from "../../images/icon/location.svg";
// import phone from "../../images/icon/phone.svg";
// import clock from "../../images/icon/clock.svg";
// import StarRatings from "react-star-ratings";

// class CategoryItem extends Component {
//   constructor(props) {
//     super(props);
//   }
//   showDetails = () => {
//     const { event } = this.props;
//     this.props.history.push({
//       pathname: `/event-detail/${event._id}`,
//       state: event
//     });
//   };
//   render() {
//     const { event, userdata, calendar } = this.props;
//     let youInterested;
//     if (event && userdata && userdata.data) {
//       youInterested = event.interested.find(oneInterested => {
//         return oneInterested._id == userdata.data._id;
//       });
//     }
//     let avgRate,
//       sum = 0;
//     if (event) {
//       event.reviews.forEach(m => (sum += parseInt(m.stars)));
//       avgRate = sum / event.reviews.length;
//       if (event.reviews.length == 0) {
//         avgRate = 0;
//       }
//     }
//     // if (event) {
//     //   interestPeople = getInterestPeople(userdata.data ? userdata.data : null, event);
//     //   youInterested =
//     //     userdata.data &&
//     //     event.interested.find(
//     //       oneInterested => {
//     //         if (this.props.location.pathname === "/wishlist") {
//     //           return oneInterested === userdata.data._id
//     //         }
//     //         return oneInterested._id === userdata.data._id
//     //       }
//     //     );
//     // }
//     const weekSchedule = [
//       { start: event && event.sunStartTime, end: event && event.sunEndTime },
//       { start: event && event.monStartTime, end: event && event.monEndTime },
//       { start: event && event.tueStartTime, end: event && event.tueEndTime },
//       { start: event && event.wedStartTime, end: event && event.wedEndTime },
//       { start: event && event.thrStartTime, end: event && event.thrEndTime },
//       { start: event && event.friStartTime, end: event && event.friEndTime },
//       { start: event && event.satStartTime, end: event && event.satEndTime }
//     ];
//     const d = new Date().getDay();
//     return (
//       <div
//         className="events-list"
//         style={calendar ? { flexDirection: "column" } : null}
//       >
//         <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12  offset-md-1 offset-lg-2 event-img">
//           <div
//             className="img"
//             style={{
//               backgroundImage: `url(${(event.image && event.image.url) ? event.image.url : placeholder_img})`,
//               backgroundSize: "cover"
//               // backgroundPosition: "center"
//             }}
//           />
//         </div>
//         <div className="col-lg-5 col-md-6 col-sm-6 col-sm-12 col-xs-12  event-detail">
//           <div className="head">
//             <div>
//               <Link to={{ pathname: `/event-details/${event._id}` }}>
//                 <div className="title">{event.title}</div>
//               </Link>
//               <div className="mobile-social">
//                 <img
//                   className="wishlist"
//                   src={youInterested ? heart_full : heart}
//                   title={localStore("token") ? null : "Login first "}
//                   onClick={() => {
//                     if (localStore("token")) {
//                       this.props.addInterest({
//                         id: event._id,
//                         pathname: this.props.location.pathname
//                       });
//                     } else {
//                       this.props.history.push("/auth");
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="reviews">
//             <StarRatings
//               rating={avgRate}
//               // rating={this.state.rating}
//               starRatedColor="#fbc000"
//               // changeRating={this.changeRating}
//               starDimension="0.8em"
//               starSpacing="0px"
//               numberOfStars={5}
//               name="rating"
//             />
//             <div
//               className-="reviews-count"
//               style={{ fontSize: "12px", marginLeft: "10px", color: "#808080" }}
//             >
//               {event.reviews.length} reviews
//             </div>
//           </div>
//           <div className="middle">
//             <div className="event-des">
//               {event && event.content && event.content.brief
//                 ? event.content.brief
//                 : `Loremm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt vitae semper quis lectus nulla. Volutpat odio facilisis mauris sit amet massa vitae tortor.`}{" "}
//             </div>

//             <div className="icon-div">
//               <img className="icon" src={mapMarker} />
//               {event && event.EventPlace 
//                 ? event.EventPlace  + ' , '
//                 : ""}
//               {event && event.EventState && this.props.places.data
//                 ? this.props.places.data.find(
//                     state => state._id == event.EventState
//                   ).name
//                 : null}
//               {/* <img className="icon" src={mapMain} /> */}
//             </div>
//             <div className="row ">
//               <div className="icon-div col-md-12 col-6">
//                 <img src={phone} className="icon" />
//                 {event.phone_number ? event.phone_number : "123456789"}
//               </div>
//               <div
//                 style={{ float: "left" }}
//                 className="icon-div col-md-12 col-6"
//               >
//                 {event && (
//                   <div className="open-status-detail">
//                     <img src={clock} className="icon" />
//                     {moment(weekSchedule[d].start, "hh:mm a").format("HH:mm") <
//                       moment().format("HH:mm") &&
//                     moment(weekSchedule[d].end, "hh:mm a").format("HH:mm") >
//                       moment().format("HH:mm")
//                       ? "Opened now"
//                       : "Closed now"}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//             </div>
//             <div>

//             </div>
//             <div className="social">
//               <img
//                 className="wishlist"
//                 src={youInterested ? heart_full : heart}
//                 title={localStore("token") ? null : "Login first "}
//                 onClick={() => {
//                   if (localStore("token")) {
//                     this.props.addInterest({
//                       id: event._id,
//                       pathname: this.props.location.pathname
//                     });
//                   } else {
//                     this.props.history.push("/auth");
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   userdata: state.auth.userdata.data,
//   places: state.event.locations.data
// });

// const mapDispatchToProps = dispatch => ({
//   addInterest: id => dispatch(addInterestRequest(id))
//   //   sharePost: post_id => dispatch(sharePost(post_id))
// });

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(CategoryItem)
// );
