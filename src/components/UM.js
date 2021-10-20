import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UnderMaintenance = () => {
    const { loginWithRedirect } = useAuth0()
    return <section className='undermaintenance-page'>
        <div className='left-side'>
            <h1>Betting</h1>
            <h1>App</h1>
        </div>
        <div className='right-side'>
            <p>Please login!</p>
            <button type='submit' onClick={loginWithRedirect}>Login</button>
        </div>
    </section>
}
export default UnderMaintenance;