import React from 'react';
import './Common.css';
import useFetcher from '../Hook/useFetcher';

import DashboardContext from '../Context/DashboardContext';
import Dashboard from '../Layout/Dashboard';

export default function Home() {

  const fetch = useFetcher('/api/v1/analytics');

  return (
    <div className="page-wrapper">
        <h2>Home</h2>
        {fetch.isLoading && "LOADING"}
        {fetch.error && fetch.error}
        <DashboardContext.Provider value={fetch}>
            <Dashboard />
        </DashboardContext.Provider>
    </div>
  );
}