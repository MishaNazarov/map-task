import React, { Component } from "react";

let map;

class Map extends Component {
  onScriptLoad = addresses => {
    let middlePoints = addresses.slice(1, addresses.length - 1);
    let waypointsArray = middlePoints.map(obj => ({
      location: obj
    }));
    this.renderMap();
    let start = addresses[0];
    let end = addresses[addresses.length - 1];

    let directionsDisplay = new window.google.maps.DirectionsRenderer({
      draggable: true,
      map: map
    });

    let request = {
      origin: start,
      destination: end,
      waypoints: waypointsArray,
      travelMode: "DRIVING"
    };
    let directionsService = new window.google.maps.DirectionsService();
    directionsService.route(request, (response, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });

    directionsDisplay.addListener("directions_changed", () => {
      if (addresses.length >= 2) {
        this.getAddressAfterDrag(directionsDisplay.getDirections());
      }
    });
  };

  renderMap = () => {
    map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );
  };

  getAddressAfterDrag(addresses) {
    let geocoder = new window.google.maps.Geocoder();
    let formattedArray = [];
    let length = addresses.geocoded_waypoints.length;
    length = length - 1;
    addresses.geocoded_waypoints.map((res, index) => {
      geocoder.geocode({ placeId: res.place_id }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            formattedArray.push(results[0].formatted_address);
            if (length === index) {
              console.log(formattedArray);
              //TODO: this is working async
              // this.props.updateAddress(formattedArray);
            }
          } else {
            console.log("No results found");
          }
        }
      });
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.addresses !== newProps.addresses) {
      this.onScriptLoad(newProps.addresses.addresses);
    }
  }
  componentDidUpdate() {}

  componentDidMount() {
    if (!window.google) {
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBEzhhIEpt8xgDAmgvp6Cd2iFYMkTjyEyg`;
      let x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener("load", e => {
        this.renderMap();
      });
    }
  }

  render() {
    return <div style={{ width: "auto", height: "100%" }} id={this.props.id} />;
  }
}

export default Map;
