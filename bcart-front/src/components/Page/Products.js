import React from 'react';
import './Common.css';
import useFetcher from '../Hook/useFetcher';

import ProductContext from '../Context/ProductContext';
import ProductItems from '../Layout/ProductItems';

import ProfileContext from '../Context/ProfileContext';

export default function Products() {

  const fetch = useFetcher('/api/v1/products');
  const take = useFetcher('/api/v1/profile');

  return(
    <div className="page-wrapper">
      <h2>Products</h2>
      {fetch.isLoading && "LOADING"}
        {fetch.error && fetch.error}
        <ProductContext.Provider value={fetch}>
            <ProfileContext.Provider value={take}>
              <ProductItems />
            </ProfileContext.Provider>
        </ProductContext.Provider>
    </div>
  );
}