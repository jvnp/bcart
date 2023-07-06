import React from 'react';
import './Common.css';

import useFetcher from '../Hook/useFetcher';

import ProductContext from '../Context/ProductContext';
import ProfileContext from '../Context/ProfileContext';

import CartItems from "../Layout/CartItems"

export default function Cart() {

  const fetch = useFetcher('/api/v1/products');
  const take = useFetcher('/api/v1/profile');

  return(
    <div className="page-wrapper">
      {fetch.isLoading && "LOADING"}
        {fetch.error && fetch.error}
        <ProductContext.Provider value={fetch}>
            <ProfileContext.Provider value={take}>
              <CartItems />
            </ProfileContext.Provider>
        </ProductContext.Provider>
    </div>
  );
}