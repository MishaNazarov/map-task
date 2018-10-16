import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";

class Input extends Component {
  state = {
    address: ""
  };

  chechAddress = addr => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: addr
      },
      (results, status) => {
        if (
          status === window.google.maps.GeocoderStatus.OK &&
          results.length > 0
        ) {
          addr = results[0].formatted_address;
          this.props.addAddress(addr);
        } else alert("Invalid address");
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { address } = this.state;
    if (address) {
      this.chechAddress(address);
    }
    this.setState(prev => ({
      ...prev,
      address: ""
    }));
  };

  handleChange = e => {
    let value = e.currentTarget.value;
    const fieldName = e.currentTarget.dataset.fieldName;
    this.setState(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  render() {
    const { address } = this.state;

    return (
      <div className="input">
        <form onSubmit={this.handleSubmit}>
          <input
            data-field-name={"address"}
            type={"text"}
            placeholder={"Введите адрес"}
            className={"input-field"}
            onChange={this.handleChange}
            value={address}
          />
        </form>
      </div>
    );
  }
}

Input.propTypes = {
  address: PropTypes.string
};

export default Input;
