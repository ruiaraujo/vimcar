import React, { Component } from 'react';
import { arrayOf, func } from 'prop-types';

import { productType } from './types';
import cart from './images/cart.svg';
import './Cart.css';
import ProductItem from './ProductItem';

class Cart extends Component {
  state = {
    showCart: false
  };

  hideCart = () => this.setState({ showCart: false });

  handleShowCart = () => {
    if (this.props.itemsInCart.length > 0) {
      this.setState({ showCart: true });
    }
  };
  removeProductFromCart = index => () => this.props.removeProductFromCart(index);

  render() {
    return (
      <div>
        {this.state.showCart && <div className="cart-overlay" onClick={this.hideCart} />}
        <div className="cart-container" onClick={this.handleShowCart}>
          {this.props.itemsInCart.length > 0 && <span className="cart-badge">{this.props.itemsInCart.length}</span>}
          <img src={cart} alt="" />
          {this.state.showCart &&
            <div className="product-list">
              {this.props.itemsInCart.map((product, index) =>
                <ProductItem
                  key={`${product.uid}-${index}`}
                  {...product}
                  removeProductFromCart={this.removeProductFromCart(index)}
                />
              )}
            </div>}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  itemsInCart: arrayOf(productType).isRequired,
  removeProductFromCart: func.isRequired
};

export default Cart;
