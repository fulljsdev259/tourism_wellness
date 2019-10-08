import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import Trash from "../../images/trash.svg";
import { Link } from "react-router-dom";
import "./company.scss";
import * as actions from "../../redux/actions";
import Loader from "react-loader-spinner";
// import Table from 'rc-table';

class Company extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   ApiCall: true
    // };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    let { userdata } = this.props;
    if (!this.props.post.data && userdata.data) {
      this.props.getUserPostById(userdata.data._id);
    }
  }
  componentDidUpdate() {
    let { userdata } = this.props;
    if (!this.props.post.data && userdata.data) {
      this.props.getUserPostById(userdata.data._id);
    }
  }
  render() {
    const { data } = this.props.post;
    const { isDataLoading } = this.props.userDataLoading;
    {
      // console.log(this.props.userDataLoading, "000000000");
    }
    // if (this.state.ApiCall && data) {
    //   this.props.getUserPostById(data._id);
    //   this.setState({
    //     ApiCall: false
    //   });
    // }
    // const columns = [{
    //     title: 'Name', dataIndex: 'name', key:'name', width: 100,
    //   }, {
    //     title: 'Age', dataIndex: 'age', key:'age', width: 100,
    //   }, {
    //     title: 'Address', dataIndex: 'address', key:'address', width: 200,
    //   }, {
    //     title: 'Operations', dataIndex: '', key:'operations', render: () => <a href="#">Delete</a>,
    //   }];
    //   const data = [
    //     { name: 'Jack', age: 28, address: 'some where', key:'1' },
    //     { name: 'Rose', age: 36, address: 'some where', key:'2' },
    //   ];
    return (
      <div className="col-md-8 offset-md-2 col-10 offset-1 companyList">
        {/* <Table columns={columns} data={data} /> */}
        {isDataLoading ? (
          <div className="company-loader-div text-center mt-30" >
              <Loader type="Oval" color="#22b5fb" height="40" width="40" />
          </div>
        ) : (
          
          <table className="table table-hover companyTable ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                this.props.userdata.data &&
                data.map((m, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <Link to={{ pathname: `/companyDetails/${m._id}` }}>
                        {m.title}
                      </Link>
                    </td>
                    <td
                      onClick={() =>
                        this.props.deleteEvent({
                          eventId: m._id,
                          userId: this.props.userdata.data._id
                        })
                      }
                    >
                      <img src={Trash} width="20" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata.data,
  userDataLoading: state.event.postById.isLoading,
  post: state.event.postById.data
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: data => dispatch(actions.deleteEventRequest(data)),
  getUserPostById: data => dispatch(actions.getUserPostByIdRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
