import React from "react";
import "./header.scss";
import Logo from "../../images/logo.png";
import bars from "../../images/bars.svg";
import Menu from "../../images/icon/menu.svg";
import user from "../../images/user.svg";
import Close from "../../images/icon/cross.svg";
import { Link, withRouter } from "react-router-dom";
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { localStore } from "../../services/storage";
import CategoryBlock from "../generic/CategoryBlock";
import fitness from "../../images/category/fitness.svg";
import fitness_active from "../../images/category/fitness_active.svg";
import food from "../../images/category/food.svg";
import food_active from "../../images/category/food_active.svg";
import shopping from "../../images/category/shopping.svg";
import shopping_active from "../../images/category/shopping_active.svg";
import SPA from "../../images/category/SPA.svg";
import SPA_active from "../../images/category/SPA_active.svg";
import footer1 from "../../images/footer1.png";
import footer2 from "../../images/footer2.png";
import footer3 from "../../images/footer3.png";
import footer4 from "../../images/footer4.png";
import footer5 from "../../images/footer5.png";
import f11 from "../../images/f11.png";
import f12 from "../../images/f12.jpg";
import f13 from "../../images/f66.png";
import f14 from "../../images/f99.png";
import fb from "../../images/icon/fb.svg";
import twitter from "../../images/icon/twitter.svg";
import insta from "../../images/icon/insta.svg";
let categories = [
  { name: "Food", image: food, image_active: food_active, path: "/food",backupImage: food },
  { name: "SPA", image: SPA, image_active: SPA_active, path: "/SPA",backupImage: SPA },
  { name: "Fitness", image: fitness, image_active: fitness_active, path: "/fitness",backupImage: fitness },
  { name: "Shopping", image: shopping, image_active: shopping_active, path: "/shopping",backupImage:shopping }
];
// import { receiveLogout } from '../../action/auth'
// import Loader from '../loader';

// import Modal from 'react-modal';
// import About from '../about';
// import Contact from '../contact';
// import Event from '../events';
// import GetListed from '../getListed';
// import News from '../news'
// import Register from '../register';
// import ItemDetail from '../itemDetail';
// import Router from 'react-router';
// import Home from '../home';
const customStyles = {
  content: {
    top: "0%",
    left: "0%",
    right: "0%",
    bottom: "0%",
    borderTopLeftRadius: 30,

    border: "none",
    marginLeft: "35%",
    transform: "translate(0%, 0%)"
  }
};

const customStylesRegister = {
  content: {
    top: "0%",
    left: "0%",
    right: "0%",
    bottom: "0%",
    border: "none",
    borderTopLeftRadius: 30,
    backgroundColor: "#5165FF",

    marginLeft: "35%",
    transform: "translate(0%, 0%)"
  }
};


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement( '#root' )
// const Map = ReactMapboxGl( {
//     accessToken: "pk.eyJ1Ijoia2VjaGVhbGV4cHJ0MiIsImEiOiJjam94azh4OHcyODByM3FqeHd1Nm43NWl6In0.0w8_b3fwLMXf8a1zSGgC2w"
// } );

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openClass: "",
      auth: false,
      showLoading: false,
      search_city: "",
      search_state: "",
      state: "",
      city: "",
      ageFlag: false,
      id: "",
      status: true,
      location_status: "",
      selected_category: null,
    };
    this.ToggleBody = () => {
      //this.props.setMobileMenu();
      var currentClass = document.getElementsByTagName("body")[0];
      var isAlreadyOpened = currentClass.classList.contains("open");
      this.setState({selected_category:window.location.pathname.toLowerCase()});
      if (!isAlreadyOpened) {
        currentClass.classList.add("open");
      } else {
        currentClass.classList.remove("open");
      }
    };
    // props.isAlreadyLoggedIn();
    if (!props.categories.data) {
      props.getCategories();
    }
    if (!props.locations.data) {
      props.getLocations();
    }
    if (localStore("token")) {
      props.getUserData(localStore("token"));
    }
    // if (!props.homeData) {
    //   props.homePageData();
    // }
  }

  handleSelected=(e)=>{
    categories.forEach((value)=>{
      if(this.state.selected_category===e.toLowerCase()){
          value.image=value.image_active
         }
         else if(value.image === value.image_active){
          value.image=value.backupImage
         }
         else{
          value.image=value.backupImage
        }
    })
    this.setState({
      a:true
    })
  }

  componentWillReceiveProps(nextProps) {
    const oThis = this;
    if (oThis.props.authenticated !== nextProps.authenticated) {
      // Check if it's a new user, you can also use some unique property, like the ID
      this.setState({ auth: nextProps.authenticated });
    }
  }
  // componentDidUpdate(prevProps) {
  //   if (this.state.prevProp !== prevProps) {
  //     if (this.props.categories.data&& prevProps.categories.data !== this.props.categories.data) {
  //       prevProps.getCategories();
  //     }
  //     if (!prevProps.locations.data) {
  //       prevProps.getLocations();
  //     }
  //     if (localStore("token")) {
  //       prevProps.getUserData(localStore("token"));
  //     }
  //     this.setState({
  //       prevProp: prevProps
  //     });
  //   }
  // }
  render() {
    //categories
    const { filters } = this.props;
    const cat =
      this.props.categories && this.props.categories.data
        ? this.props.categories.data.find(
            category => this.props.location.pathname === "/" + category.name
          )
        : "";
     

    if (this.props.categories && this.props.categories.data && !this.state.id) {
      const oneCategory = this.props.categories.data.find(category => {
        return category.name === this.props.match.path.replace("/", "");
      });
      if (oneCategory) {
        if (!this.state.id) {
          this.setState({ id: oneCategory._id });
        }

        this.props.getEventsByCategoryRequest({
          id: oneCategory._id,
          page_number: 1,
          ageFlag: filters.ageFlag,
          eventState: filters.selectedState,
          eventCity: filters.selectedCity
        });
      }
    }

    const oThis = this;
    let { loggedUserData } = this.props;
    let d = new Date();
    let currentYear = d.getFullYear();
    // if (this.props.login.isSuccess && this.props.userdata.data) {
    //   this.props.history.push("/");
    // }
    let linkDashboard = "/admin";
    if (loggedUserData && loggedUserData.role !== "admin") {
      linkDashboard = "/user";
    }
    // console.log(oThis.props);

    return (
      <div style={{ borderBottom: "1px solid #ebebeb" }} className="fix-header">
        {/* { this.state.apiCall ? <Loader /> : '' } */}
        <div className="menuMobile">
          <Link to="/">
            <div className="logoDiv">
              <img className="logo" src={Logo} />
            </div>
          </Link>
          <div className="itemDiv">
            <button className="menu-toggle" onClick={this.ToggleBody} />
            <nav>
              {/* <Link to="/">
                {" "}
                <img onClick={this.ToggleBody} className="logo" src={Logo} />
              </Link> */}              

              <ul className={`menu ${localStore("token") && this.props.userdata.data ? "loggedIn" :"loggedOut" }`} >
                <li
                  className="row " >
                    <div className="categories col-sm-12">
                        {categories.map((category, i) => {
                          return (
                            <div
                              key={i}
                              className={`category ${
                                window.location.pathname.toLowerCase().search(category.name.toLowerCase()) > -1 
                                && window.location.pathname.toLowerCase() === this.state.selected_category
                                  ? "selected juiuh"
                                  : null
                              }`}
                              onClick={() => {                                                                                                                                                                                                    
                                this.ToggleBody();
                                this.props.modalStateHandler(false, false);
                                this.handleSelected(category.name);
                              }}
                            >
                              <CategoryBlock category={category} />
                            </div>
                          );
                        })}
                    </div>
                </li>
                <li data-text="ABOUT">
                  <Link to="/aboutus" onClick={this.ToggleBody}>
                    ABOUT
                  </Link>
                </li>
                <li data-text="Events">
                  {/* <Link to="/events" onClick={this.ToggleBody}>
                    EVENTS
                  </Link> */}
                  <a
                    href="https://topeventsinjamaica.com/health_wellness"
                    target="_blank"
                  >
                    EVENTS
                  </a>
                </li>
                <li data-text="CONTACT">
                  <Link to="/contactus" onClick={this.ToggleBody}>
                    CONTACT US
                  </Link>
                </li>
                {/* {!userdata.data ||
                (userdata.data &&
                  userdata.data.companyDetails &&
                  userdata.data.companyDetails.title) ? ( */}
                <li
                  style={{
                    margin: "20px 0 40px 0"
                  }}
                  data-text="GET COMPANY LISTED"
                >
                  <span
                    className="blueBtn"
                    onClick={() => {
                      this.ToggleBody();
                      this.props.modalStateHandler(true, true);
                    }}
                  >
                    GET COMPANY LISTED{" "}
                  </span>
                </li>

                {localStore("token") && this.props.userdata.data ? (
                  <li data-text="GET COMPANY LISTED" className="registerLi">
                    <div className="lower-section">
                      <div className="registerDiv logged-in">
                        <div className="name">
                          {this.props.userdata.data.name.first}{" "}
                          {this.props.userdata.data.name.last}
                        </div>
                        <div>{this.props.userdata.data.email}</div>
                        <div className="hr" />
                        <div
                          className="logout"
                          onClick={() => {
                            this.setState({
                              apiCall: true
                            });
                            this.ToggleBody();
                            this.props.modalStateHandler(false, false);
                          }}
                        >
                          <Link to="/profile">ACCOUNT SETTINGS</Link>
                        </div>
                        <div
                          className="logout"
                          onClick={() => {
                            this.setState({
                              apiCall: true
                            });
                            this.ToggleBody();
                            this.props.modalStateHandler(false, false);
                          }}
                        >
                          <Link to="/company">COMPANY PAGE</Link>
                        </div>
                        <div className="logout"
                          onClick={() => {
                          
                            this.ToggleBody();
                            this.props.modalStateHandler(false, false);
                          }}
                        >
                        <Link to="/wishlist">WishList</Link>
                        </div> 
                        <div
                          className="logout"
                          onClick={() => {
                            this.setState({
                              apiCall: true
                            });
                            this.ToggleBody();
                            this.props.modalStateHandler(
                              false,
                              false,
                              false,
                              false,
                              false,
                              false,
                              false
                            );
                            localStorage.removeItem("token");
                            this.props.history.push("/auth/");
                            this.props.logout();
                          }}
                        >
                          <a
                          > LOG OUT</a>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li
                    data-text="GET COMPANY LISTED"
                    className="registerLi"
                    onClick={() => {
                      this.ToggleBody();
                      this.props.modalStateHandler(
                        true,
                        false,
                        false,
                        false,
                        false,
                        true,
                        true
                      );
                    }}
                  >
                    <div className="lower-section">
                      <div className="registerDiv logged-in"
                        onClick={() => {window.scrollTo(0,0)}}
                      >
                        <Link to="/auth">
                          REGISTER / LOGIN
                        </Link>
                      </div>
                    </div>              
                  </li>
                )}
                <li className="top-footer">
                  <div className="top-mobile-footer">
                    <div className="footerLinks">
                      <div className = "row1">
                          <a href="https://www.mot.gov.jm/" target="_BLANK">
                            <img src={footer1} />
                          </a>
                          <a
                            href="https://www.mot.gov.jm/agency/tourism-enhancement-fund"
                            target="_BLANK">          
                            <img src={footer4} />
                          </a>
                          <a href="http://www.jamaicatradeandinvest.org/" target="_BLANK">
                            <img src={f13} />
                          </a>                   
                          <a href="http://www.jtbonline.org/" target="_BLANK">
                            <img src={f11} />
                          </a>
                          <a href="https://rada.gov.jm/" target="_BLANK">
                              <img src={f12}/>
                            </a> 
                        </div>

                        <div className="row2">
                            <a href="http://www.jamaicatradeandinvest.org/" target="_BLANK">
                              <img  src={f14}  />
                            </a>  
                            <a href="https://www.instagram.com/thejmea_/" target="_BLANK">
                              <img src={footer2} />
                            </a>
                            <a href="https://www.jbdc.net/" target="_BLANK">
                              <img src={footer3} />
                            </a>     
                            <a href="https://www.facebook.com/tefjamaica/" target="_BLANK">
                                <img src={fb} />
                              </a>
                              <a
                                href="https://www.instagram.com/tourismenhancementfundja/"
                                target="_BLANK"
                              >
                                <img src={insta} />
                              </a>                     
                                              
                        </div>                                   
                      </div>

                      <div className="copyright">
                      <span>
                        Copyright © {currentYear}. Developed by the Tourism Linkages Network, a division of the Tourism Enhancement Fund
                      </span>
                      </div>
                    </div>     
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {
          <div
            className={
              this.props.mobileMenu ? "menuItemMobile" : "menuItemMobileNone"
            }
          >
            <div className="headerMobileMenu">
              <div />
              <img onClick={this.props.setMobileMenu} src={Close} />
            </div>
            <div className="contentMobileMenu">
              <div className="upper-section">
                <div
                  onClick={() => {
                    this.setState({
                      apiCall: true
                    });
                    this.ToggleBody();
                    this.props.modalStateHandler(false, false);
                  }}
                >
                  <Link to="/profile">ACCOUNT SETTINGS</Link>
                </div>
              </div>
            </div>
            <div className="lower-section">
              <div className="registerDiv" onClick={() => {}}>
                <Link to="/auth">Register / Login</Link>
              </div>
            </div>
          </div>
        }
        <div className="menu row">
          <div className="logoDiv col-2">
            <Link to="/">
              {" "}
              <img className="logo" src={Logo} />
            </Link>
          </div>
          <div className="itemDiv col-8">
            <div className="item">
              <div
                className="normal"
                onClick={() => {
                  oThis.props.modalStateHandler(
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                    true
                  );
                }}
              >
                <Link to="/aboutus">About us</Link>
              </div>
              <div
                className="normal"
                onClick={() => {
                  oThis.props.modalStateHandler(
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    true
                  );
                }}
              >
                {/* <Link to="/events">Events</Link> */}
                <a
                  href="https://topeventsinjamaica.com/health_wellness"
                  target="_blank"
                >
                  Events
                </a>
              </div>
              <div
                className="normal"
                // onClick={() => {
                //   oThis.props.modalStateHandler(
                //     false,
                //     true,
                //     false,
                //     false,
                //     false,
                //     false,
                //     true
                //   );
                // }}
              >
                <Link to="/contactus">Contact us</Link>
                {/* <a>Contact us</a> */}
              </div>
              <div
                className="getStarted"
                onClick={() => {
                  oThis.props.modalStateHandler(true, true);
                }}
              >
                <a>GET COMPANY LISTED</a>
              </div>
            </div>
          </div>

          {localStore("token") && this.props.userdata.data ? (
            <div className="col-2 profileDiv">
              <div className="dropdown">
                <img className="dropbtn" src={user} />
                <div className="dropdown-content">
                  <div className="logged-user">
                    <h6>
                      {this.props.userdata.data.name.first}{" "}
                      {this.props.userdata.data.name.last}
                    </h6>
                    <span>{this.props.userdata.data.email}</span>
                  </div>
                  <div
                    onClick={() => {
                      this.setState({
                        apiCall: true
                      });
                      this.ToggleBody();
                      this.props.modalStateHandler(false, false);
                    }}
                  >
                    <Link to="/profile">ACCOUNT SETTINGS</Link>
                  </div>
                  <div
                    onClick={() => {
                      this.setState({
                        apiCall: true
                      });
                      this.ToggleBody();
                      this.props.modalStateHandler(false, false);
                    }}
                  >
                    <Link to="/company">COMPANY PAGE</Link>
                  </div>
                  <div>
                       <Link to="/wishlist">WishList</Link>
                  </div>
                  <div>
                    <button
                      className="logout"
                      onClick={() => {
                        this.props.history.push("/auth/");
                        this.props.logout();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="registerDiv col-2">
              <Link to="/auth/">Login/Register</Link>
            </div>
            
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.auth.login,
  // socialLogin: state.auth.socialLogin,
  categories: state.event.categories.data,
  locations: state.event.locations.data,
  userdata: state.auth.userdata.data,
  homeData: state.event.featuredEvents.data, 
  // return { authenticated: state.auth.isAuthenticated, loggedUserData: state.auth.loggedUserData }
});

const mapDispatchToProps = dispatch => ({
  // isAlreadyLoggedIn: () => dispatch(actions.isAlreadyLoggedIn()),
  getCategories: () => dispatch(actions.getCategoriesRequest()),
  getEventsByCategoryRequest: data =>
  dispatch(actions.getEventsByCategoryRequest(data)),
  getLocations: () => dispatch(actions.getLocationsRequest()),
  getUserData: data => dispatch(actions.getUserDataRequest(data)),
  logout: () => dispatch(actions.logout()),  
  homePageData: ()=> dispatch(actions.getFeaturedEventsRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
