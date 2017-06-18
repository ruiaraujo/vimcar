import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';

import products from './products';

const ADD_PRODUCT_TO_CART = 'vimcar/ADD_PRODUCT_TO_CART';
const REMOVE_PRODUCT_FROM_CART = 'vimcar/REMOVE_PRODUCT_FROM_CART';
const LOAD_PRODUCTS = 'vimcar/LOAD_PRODUCTS';
const LOADED_PRODUCTS = 'vimcar/LOADED_PRODUCTS';
const LOAD_PRODUCTS_FAILED = 'vimcar/LOAD_PRODUCTS_FAILED';

const initialState = {
  loading: false,
  loaded: false,
  products: [],
  cart: []
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { ...state, cart: state.cart.concat(action.payload) };
    case REMOVE_PRODUCT_FROM_CART:
      const newCart = state.cart.slice(0);
      newCart.splice(action.payload, 1);
      return {
        ...state,
        cart: newCart
      };
    case LOAD_PRODUCTS:
      return {
        ...state,
        loading: true
      };
    case LOADED_PRODUCTS:
      return {
        ...state,
        loading: false,
        loaded: true,
        errorLoading: false,
        products: action.payload
      };
    case LOAD_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
        errorLoading: true
      };
    default:
      return state;
  }
}

function getProducts() {
  return new Promise(resolve => setTimeout(() => resolve(products), 1000));
}

export function* rootSaga() {
  yield takeLatest(LOAD_PRODUCTS, function*() {
    try {
      const payload = yield call(getProducts);
      yield put({
        type: LOADED_PRODUCTS,
        payload
      });
    } catch (e) {
      yield put({
        type: LOAD_PRODUCTS_FAILED,
        error: true,
        payload: e
      });
    }
  });
}

export const loadProducts = () => ({ type: LOAD_PRODUCTS });
export const addProductToCart = uid => ({ type: ADD_PRODUCT_TO_CART, payload: uid });
export const removeProductFromCart = index => ({ type: REMOVE_PRODUCT_FROM_CART, payload: index });

export const productsSelector = state => state.products;
export const loadingProductsSelector = state => state.loading;
export const loadedProductsSelector = state => state.loaded;
export const errorLoadingSelector = state => !!state.errorLoading;
export const cartSelector = state => state.cart;
export const itemsInCartSelector = createSelector(productsSelector, cartSelector, (products, cart) =>
  cart.map(uid => products.find(product => product.uid === uid))
);

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  let finalCreateStore;
  if (window.devToolsExtension) {
    finalCreateStore = compose(applyMiddleware(...middleware), window.devToolsExtension())(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducer);
  sagaMiddleware.run(rootSaga);
  return store;
}
