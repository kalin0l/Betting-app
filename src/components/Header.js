import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaReact } from "react-icons/fa";
import { SportContext } from '../context'

function Header() {
    const { loginWithRedirect, logout, user } = useAuth0();
    const { openBets } = React.useContext(SportContext);

    

    const isUser = user;
    return <header className='header'>
        <section className='header-buttons'>
            <div>
                <a href='http://localhost:3000/' ><FaReact className='icon' /></a>
                <span className='heading-name'>React</span>
            </div>
            <div className='user-info'>
                {isUser && user.picture && <img src={user.picture} alt={user.name} />}
                {isUser && user.name && <div>
                    <h4><strong>Welcome,{user.name.toUpperCase()}</strong></h4>
                    <p>Balance:{openBets && openBets.newBalance < 0 ? 0 :  openBets.newBalance}$</p>
                </div>}
                {isUser ? <button type='submit' onClick={() => { logout({ returnTo: window.location.origin }) }}>Logout</button> : <button type='submit' onClick={loginWithRedirect}>Login</button>}
            </div>
        </section>
    </header>
};

export default Header;