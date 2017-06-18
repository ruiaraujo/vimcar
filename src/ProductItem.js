import React from 'react';
import { string, func, bool, number } from 'prop-types';

import './ProductItem.css';
import ProductPrice from './ProductPrice';

const ProductItem = ({ brandNew, sale, title, price, image, addProductToCart, removeProductFromCart }) =>
  <div className="list-item" onClick={removeProductFromCart}>
    <div className="list-item-title-container">
      <div className="list-image">
        <img src={image} alt="" />
      </div>
      <span className="item-title">{title}</span>
    </div>
    <ProductPrice price={price} sale={sale} />
  </div>;

ProductItem.propTypes = {
  uid: number.isRequired,
  image: string.isRequired,
  title: string.isRequired,
  price: number.isRequired,
  sale: number,
  brandNew: bool,
  removeProductFromCart: func.isRequired
};

export default ProductItem;
