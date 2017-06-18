import React, { Component } from 'react';
import { func, bool, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import {
  loadProducts,
  loadedProductsSelector,
  loadingProductsSelector,
  errorLoadingSelector,
  addProductToCart,
  productsSelector,
  itemsInCartSelector,
  removeProductFromCart
} from './reducer';
import './App.css';
import logo from './images/vimcar-logo.svg';
import Product from './Product';
import Cart from './Cart';
import { productType } from './types';

class App extends Component {
  componentWillMount() {
    this.props.loadProducts();
  }

  handleSelectChange = handler => ev => handler(ev.target.value);
  handleChange = ev => this.props.setAmount(ev.target.value);

  renderBody() {
    if (this.props.loadingProducts) {
      return <p>Loading products</p>;
    }

    if (this.props.errorLoading) {
      return (
        <div>
          <p>Error loading the products.</p>
          <button onClick={this.props.loadProducts}>
            Click to retry loading
          </button>
        </div>
      );
    }

    return (
      <div className="products">
        {this.props.products.map(product =>
          <Product key={product.uid} {...product} addProductToCart={this.props.addProductToCart} />
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <img src={logo} alt="" className="App-header" />
        {this.renderBody()}
        <Cart itemsInCart={this.props.itemsInCart} removeProductFromCart={this.props.removeProductFromCart} />
      </div>
    );
  }
}

App.propTypes = {
  loadedProducts: bool.isRequired,
  loadingProducts: bool.isRequired,
  errorLoading: bool.isRequired,
  loadProducts: func.isRequired,
  products: arrayOf(productType).isRequired,
  addProductToCart: func.isRequired,
  removeProductFromCart: func.isRequired,
  itemsInCart: arrayOf(productType).isRequired
};

const mapState = state => ({
  products: productsSelector(state),
  loadedProducts: loadedProductsSelector(state),
  loadingProducts: loadingProductsSelector(state),
  errorLoading: errorLoadingSelector(state),
  itemsInCart: itemsInCartSelector(state)
});

const mapActions = {
  loadProducts,
  addProductToCart,
  removeProductFromCart
};

export default connect(mapState, mapActions)(App);
