import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../components/Input";
import MapContainer from "./MapContainer";
import ListAddress from "../components/ListAddress";
const mapStateToProps = store => ({
  addresses: store.addresses
});

const mapDispatchToProps = dispatch => ({
  addAddress: dispatch.addresses.addAddress,
  updateAddress: dispatch.addresses.updateAddress
});

class PageContainer extends Component {
  render() {
    const { addAddress, updateAddress, addresses } = this.props;
    return (
      <div className="app-wrapper">
        <div className="contols">
          <Input addAddress={addAddress} />
          <ListAddress
            addresses={addresses.addresses}
            updateAddress={updateAddress}
          />
        </div>
        <div className="map-wrapper">
          <MapContainer
            addAddress={addAddress.addresses}
            updateAddress={updateAddress}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
