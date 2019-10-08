import React from "react";
import { Formik, Form } from "formik";
import { localStore } from "../../services/storage";
import StarRatings from "react-star-ratings";
import "./addReview.scss";
import Review from "../generic/Review";

export default ({
  addReviewRequest,
  event_id,
  addReviewstatus,
  data,
  userdata,
  checkPoint,
  changeReviewFlag,
  history
}) => {
  return (
    <Formik
      initialValues={{
        comment: "",
        stars: 0,
        leaveReview: ""
      }}
      validate={values => {
        let errors = {};
        values.comment = values.comment.trim();
        if (!values.comment) {
          errors.comment = "Required";
        }
        if (!values.stars || values.stars == 0) {
          errors.stars = "Required";
        }
        return errors;
      }}
      onSubmit={(values, actions) => {
        if (localStore("token")) {
          addReviewRequest({ values, event_id });
          actions.resetForm();
        }
      }}
      render={({
        values,
        errors,
        status,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
        <Form>
          <div
            className="row comments"
            style={{
              marginLeft: "0",
              paddingLeft: "0",
              flexDirection: "column"              
            }}
          >
            {data && data.reviews.length ? (
              <div
                className="reviews"
                style={{ display: "flex", flexDirection: "column",marginLeft: "0" }}
              >
                {userdata.data &&
                data &&
                data.reviews.find(review => {
                  return (
                    review.user_id && review.user_id._id == userdata.data._id
                  );
                }) ? (
                  <>
                    {data &&
                      data.reviews
                        .filter(review => {
                          return review.user_id
                            ? review.user_id._id == userdata.data._id
                            : "";
                        })
                        .map((review, i) => {
                          return (
                            <div className="reviews-container">
                              <Review key={i} review={review} />
                            </div>
                          );
                        })}
                    {data &&
                      data.reviews
                        .filter(review => {
                          return review.user_id
                            ? review.user_id._id != userdata.data._id
                            : "";
                        })
                        .map((review, i) => {
                          return (
                            <div className="reviews-container">
                              {i < 2 && <Review key={i} review={review} />}
                            </div>
                          );
                        })}
                  </>
                ) : (
                  data &&
                  data.reviews.map(
                    (review, i) => i < 3 && <Review key={i} review={review} />
                  )
                )}
              </div>
            ) : (
              <div className="reviews" style={{ marginLeft: "0" }}>Be the first to add review.</div>
            )}
            {data &&
            data.reviews &&
            userdata &&
            userdata.data &&
            data.reviews.find(review => {
              return review.user_id && review.user_id._id == userdata.data._id;
            }) ? (
              ""
            ) : (
              <div className="review-box" style={{ marginLeft: "0" }}>
                {checkPoint ? (
                  <div className=" comment-box" style={{ marginLeft: "0" }}>
                    <div className="form-group">
                      <textarea
                        name="comment"
                        value={values.comment || ""}
                        placeholder="share your experience"
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.comment && touched.comment && (
                        <label className="error">{errors.comment}</label>
                      )}
                    </div>
                    <div className="form-group">                      
                      {/* <input
                    type="number"
                    name="stars"
                    value={values.stars || ""}
                    placeholder="Give Stars"
                    onChange={handleChange}
                    className="form-control"
                    id="stars"
                  /> */}
                      <StarRatings
                        starRatedColor="#fbc000"
                        changeRating={value => setFieldValue("stars", value)}
                        numberOfStars={5}
                        name="stars"
                        rating={values.stars}
                        starDimension="20px"
                        starSpacing="4px"
                        
                      />
                      {errors.stars && touched.stars && (
                        <label className="error">{errors.stars}</label>
                      )}
                    </div>
                    {/* <button
                      type="submit"
                      className="comment-btn btn btn-md btn-default btn-danger"
                      // disabled={localStore("token") ? false : true}
                      style={{ paddingLeft: "4px" }}
                    >
                      Post Review
                    </button> */}
                    <div>
                      <button
                        className="blue-button btn btn-danger"
                        onClick={() => changeReviewFlag(false)}
                      >
                        Cancel
                      </button>
                      <button className="blue-button ml-2 btn add-review" type="submit">
                        Add Review
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="leave-review"
                    title={!localStore("token") && "Login First"}
                    onClick={() => {
                      if (localStore("token")) {
                        changeReviewFlag(true);
                      } else {
                        history.push("/auth/")
                        // this.props.history.push("/auth/");
                      }
                    }}
                  >
                    Leave Review
                  </div>
                )}
              </div>
            )}
          </div>
        </Form>
      )}
    />
  );
};
