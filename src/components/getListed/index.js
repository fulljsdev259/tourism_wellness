import React from "react";
import Close from "../../images/icon/cross.svg";
import "./index.scss";
import Wizard from "../wizard/wizard";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

class GetListed extends React.Component {
  constructor() {
    super();
    this.state = {
      generalInfo: true,
      companyInfo: false,
      contactInfo: false,
      companyListedStatus: false
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.submitEvent.isSuccess &&
      this.props.submitEvent.isSuccess !== prevProps.submitEvent.isSuccess
    ) {
      this.props.closeModal();
    }
  }
  onSuccessCompanyListed = () => {
    this.setState({
      companyListedStatus: true
    });
  };

  renderSuccessBlock = () => {
    return (
      <div className="content">
        <div className="heading">Thank you for submitting you company.</div>
        <p>
          You will be contacted by one of our agent with 2 working days to
          verify your submission
        </p>
        <div className="heading">
          <button
            type="button"
            className="button"
            onClick={() => this.props.closeModal()}
          >
            {" "}
            OK
          </button>
        </div>
      </div>
    );
  };
  render() {
    const {
      closeModal,
      categories,
      submitEvent,
      submitEventReset,
      userdata
    } = this.props;
    return (
      <div className="getListed">
        <div className="header">
          <div>
            <span>GET COMPANY LISTED</span>
            <hr />
          </div>
          <img src={Close} onClick={() => closeModal()} />
        </div>
        {this.state.companyListedStatus ? (
          this.renderSuccessBlock()
        ) : (
          <div className="content">
            <div className="heading">Become a part of our directory</div>
            <p>Please fill the form below :</p>
            <Wizard
              onSuccessCompanyListed={this.onSuccessCompanyListed}
              onSubmit={data => {
                if (data.fullName) {
                  const [first, ...last] =
                    data.fullName && data.fullName.split(" ");
                  data.userDetails = {
                    name: {
                      first,
                      last: last.join(" ")
                    },
                    email: data.email,
                    password: data.password
                  };
                  delete data.password;
                  delete data.fullName;
                  delete data.email;
                } else {
                  data.user_id = userdata.data && userdata.data._id;
                }
                if(!data.mondayOpen){
                  delete data.monStartTime;
                }
                if(!data.tuesdayOpen){
                  delete data.tueStartTime;
                }
                if(!data.wednesdayOpen){
                  delete data.wedStartTime;
                }
                if(!data.thursdayOpen){
                  delete data.thrStartTime;
                }
                if(!data.fridayOpen){
                  delete data.friStartTime;
                }
                if(!data.saturdayOpen){
                  delete data.satStartTime;
                }
                if(!data.sundayOpen){
                  delete data.sunStartTime;
                }

                let newformData = Object.assign(data,{userInfo:JSON.stringify(data.userDetails || null)});                                
                let form_Data = new FormData();
                for ( let key in newformData ) {
                  form_Data.append(key, newformData[key]);
                }

                this.props.addEvent(form_Data);
              }}
              categories={categories}
              submitEvent={submitEvent}
              submitEventReset={submitEventReset}
              userdata={userdata}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contactUs: state.auth.contactUs,
  categories: state.event.categories.data,
  submitEvent: state.event.submitevent,
  userdata: state.auth.userdata.data
});

const mapDispatchToProps = dispatch => ({
  addEvent: values => dispatch(actions.submitEventRequest(values)),
  submitEventReset: () => dispatch(actions.submitEventReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetListed);
