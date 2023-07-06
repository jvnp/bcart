import React from 'react';
import './Common.css';
import useFetcher from '../Hook/useFetcher';

import ProfileContext from '../Context/ProfileContext';
import Profile from '../Layout/Profile';

export default function About() {

    const fetch = useFetcher('/api/v1/profile');

    return (
        <div className="page-wrapper">
            <h2>About</h2>
            {fetch.isLoading && "LOADING"}
            {fetch.error && fetch.error}
            <ProfileContext.Provider value={fetch}>
                <Profile />
            </ProfileContext.Provider>
        </div>
    );

}