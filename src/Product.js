import React, { Component } from 'react';
import { string, func, bool, number } from 'prop-types';

import './Product.css';
import ProductPrice from './ProductPrice';

class Product extends Component {
  state = {
    showAddToCart: false
  };

  addProductToCart = () => this.props.addProductToCart(this.props.uid);
  handleMouseEnter = () => this.setState({ showAddToCart: true });
  handleMouseLeave = () => this.setState({ showAddToCart: false });

  render() {
    const { brandNew, sale, title, price, image } = this.props;

    return (
      <div className="product" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className="product-image">
          {this.state.showAddToCart &&
            <div className="add-to-cart-container">
              <button className="add-to-cart-button" onClick={this.addProductToCart}>Add to Cart</button>
            </div>}
          <img src={image} alt="" />
        </div>
        {(brandNew || sale) && <div className="product-badge">{brandNew ? 'NEW' : 'SALE'}</div>}
        <span className="product-title">{title}</span>
        <ProductPrice price={price} sale={sale} />
      </div>
    );
  }
}

Product.propTypes = {
  uid: number.isRequired,
  image: string.isRequired,
  title: string.isRequired,
  price: number.isRequired,
  sale: number,
  brandNew: bool,
  addProductToCart: func.isRequired
};

export default Product;
