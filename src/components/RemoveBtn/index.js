import React, { Component } from "react";

export default class RemoveBtn extends Component {
  removeAddress = id => {
    this.props.updateAddress(id);
  };

  render() {
    return (
      <img
        className="remove-btn"
        alt="delete"
        onClick={() => this.removeAddress(this.props.id)}
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A"
      />
    );
  }
}
