import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat:props.info[1], lng: props.info[0]}}
  >
    {/* {props.isMarkerShown && */}
         <Marker position={{ lat:props.info[1], lng: props.info[0]}} />
         {/* } */}
  </GoogleMap>
))

export default MapComponent;