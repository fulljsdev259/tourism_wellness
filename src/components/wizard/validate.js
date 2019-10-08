import moment from "moment";

const validate = values => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = "Name is Required";
  }
  if (!values.title) {
    errors.title = "Company Name Required";
  }
  // if (!values.password) {
  //   errors.password = " Password Required";
  // }
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    // errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.sex) {
    errors.sex = "Required";
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = "Required";
  }

  if (values.monStartTime) {
    if (!values.monEndTime) {
      errors.monEndTime = "Enter Closed Time";
    } else if (
      moment(values.monStartTime, "hh:mm a").format("HH:mm") >=
      moment(values.monEndTime, "hh:mm a").format("HH:mm")
    ) {
      errors.monEndTime = "invalid Time";
    }
  }

  if (values.tueStartTime) {
    if (!values.tueEndTime) {
      errors.tueEndTime = "Enter Closed Time";
    } else if (
      moment(values.tueStartTime, "hh:mm a").format("HH:mm") >=
      moment(values.tueEndTime, "hh:mm a").format("HH:mm")
    ) {
      errors.tueEndTime = "invalid Time";
    }
  }

  if (values.wedStartTime) {
    if (!values.wedEndTime) {
      errors.wedEndTime = "Enter Closed Time";
    } else if (
      moment(values.wedStartTime, "hh:mm a").format("HH:mm") >=
      moment(values.wedEndTime, "hh:mm a").format("HH:mm")
    ) {
      errors.wedEndTime = "invalid Time";
    }
  }

  if (values.thrStartTime) {
    if (!values.thrEndTime) {
      errors.thrEndTime = "Enter Closed Time";
    } else if (
      moment(values.thrStartTime, "hh:mm a").format("HH:mm") >=
      moment(values.thrEndTime, "hh:mm a").format("HH:mm")
    ) {
      errors.thrEndTime = "invalid Time";
    }
  }

  if (values.friStartTime) {
    if (!values.friEndTime) {
      errors.friEndTime = "Enter Closed Time";
    } else if (
      moment(values.friStartTime, "hh:mm a").format("HH:mm") >=
      moment(values.friEndTime, "hh:mm a").format("HH:mm")
    ) {
      errors.friEndTime = "invalid Time";
    }
  }

  if (values.satStartTime) {
    if (!values.satEndTime) {
      errors.satEndTime = "Enter Closed Time";
    } else if (
      moment(values.satStartTime, "hh:mm a").format("HH:mm") >=
      moment(values.satEndTime, "hh:mm a").format("HH:mm")
    ) {
      errors.satEndTime = "invalid Time";
    }
  }

  if (values.sunStartTime) {
    if (!values.sunEndTime) {
      errors.sunEndTime = "Enter Closed Time";
    } else if (
      moment(values.sunStartTime, "hh:mm a").format("HH:mm") >=
      moment(values.sunEndTime, "hh:mm a").format("HH:mm")
    ) {
      errors.sunStartTime = "invalid Time";
    }
  }

  if (!values.region) {
    errors.region = "Region is required";
  }
  if (!values.categories) {
    errors.categories = "Category is required";
  }
  if (!values.category) {
    errors.category = "Category is required";
  }

  // if ( !values.description ) {
  //     errors.description = 'description is required'
  // }

  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.phone_number) {
    errors.phone_number = "Phone Number is required";
  } else if (!/^[0-9]*$/.test(values.phone_number)) {
    errors.phone_number = "Invalid";
  }

  // if ( !values.website ) {
  //     errors.website = 'Website is required'
  // }

  return errors;
};

export default validate;
