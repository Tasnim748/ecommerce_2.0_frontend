import React from "react";

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Fragment } from 'react';

const Cart: React.FC<{show: boolean, handleClose: Function, cartItems: {'id': number, 'name': string, 'quantity': number}[]}> = (props) => {

  return (
    <Fragment>

      <Offcanvas show={props.show} onHide={props.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ol>
            {
              props.cartItems.map(item => (<li>{item.name}  |  {item.quantity}pcs</li>))
            }
          </ol>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
}

export default Cart;