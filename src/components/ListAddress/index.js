import React, { Component } from "react";
import RemoveBtn from "../RemoveBtn";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./style.scss";

class ListAddress extends Component {
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd = result => {
    if (result.destination) {
      const items = this.reorder(
        this.props.addresses,
        result.source.index,
        result.destination.index
      );
      this.props.updateAddress(items);
    }
  };

  removeAddress = index => {
    let items = this.props.addresses;
    items.splice(index, 1);
    this.props.updateAddress(items);
  };

  render() {
    const { addresses } = this.props;
    const AddressElement = (provided, snapshot) => (
      <ul ref={provided.innerRef} className="list-group">
        {addresses.map((item, index) => (
          <Draggable key={index} draggableId={index} index={index}>
            {(provided, snapshot) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <p className="address-item">{item}</p>
                <RemoveBtn updateAddress={this.removeAddress} id={index} />
              </li>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    );

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">{AddressElement}</Droppable>
      </DragDropContext>
    );
  }
}

export default ListAddress;

ListAddress.propTypes = {
  addresses: PropTypes.array.isRequired
};
