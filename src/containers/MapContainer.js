import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../components/Map/";
import options from '../config'

const mapStateToProps = store => ({
  options: options,
  addresses: store.addresses
});

const mapDispatchToProps = dispatch => ({});

class MapContainer extends Component {
  render() {
    const { options, addresses, updateAddress } = this.props;
    return (
      <Map
        id="myMap"
        options={options}
        addresses={addresses}
        updateAddress={updateAddress}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
