import { string, bool, number, shape } from 'prop-types';

export const productType = shape({
  uid: number.isRequired,
  image: string.isRequired,
  title: string.isRequired,
  price: number.isRequired,
  sale: number,
  brandNew: bool
});
