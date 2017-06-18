import React from 'react';
import { number } from 'prop-types';
import { FormattedNumber } from 'react-intl';
import classnames from 'classnames';

import './ProductPrice.css';

const ProductPrice = ({ sale, price }) =>
  <div className="product-price-container">
    {sale &&
      <span className="product-old-price">
        <FormattedNumber value={price} style="currency" currency="EUR" />
      </span>}
    <span className={classnames('product-price', { sale: sale })}>
      <FormattedNumber value={sale || price} style="currency" currency="EUR" />
    </span>
  </div>;

ProductPrice.propTypes = {
  price: number.isRequired,
  sale: number
};

export default ProductPrice;
