import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { withRouter } from "react-router-dom";
import Card from "./Card"
import "./card.scss"
import Loader from "react-loader-spinner";
class index extends Component {
  componentDidMount() {
    this.props.getInterestRequest();
  }  
  render() {
    return (
        <div className="event-div wishlists">
        <h1 className="wishlistHeading mb-6">Your WishList</h1>
          {
            this.props.wishListLoading
            ?
            <Loader type="Oval" color="#fff" height="50" width="50" />
            :
              this.props.wishList.map((data, index)=>(
              <Card
              id={data._id}
              image={data.image && data.image.secure_url}
              title={data.title}
              EventPlace={data.EventPlace}
              phone_number={data.phone_number}
              key={index}
              cardData={data}
              userData={this.props.userData}
              addInterest={this.props.addInterest}
              reviews={data.reviews}
              />
          ))
        
          }
        </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        wishList:state.event.wishLists.data,
        wishListLoading:state.event.wishLists.isLoading,
        userdata: state.auth.userdata.data,

    }
    
}

const mapDispatchToProps = dispatch => ({
  getInterestRequest: () => dispatch(actions.getInterestRequest()),
  addInterest: id => dispatch(actions.addInterestRequest(id))

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);
