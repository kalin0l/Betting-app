import React from "react";
import { FaReact } from "react-icons/fa";
import { SportContext } from "../context/context";
import { AuthContext } from "../context/authContext";
import {  useNavigate } from "react-router-dom";

function Header() {
    const history = useNavigate();
    const {user,logout,dispatch,token} = React.useContext(AuthContext);
    const { newBalance,openDepositModal } = React.useContext(SportContext);

    const logoutHandler = () => {
      logout();
      dispatch({type:'LOGOUT'})
      if(!token){
        history('/api/v1/auth/login');

      }
      localStorage.clear();
    }


  return (
    <header className="header">
      <section className="header-buttons">
        <div>
          <a href="http://localhost:3000/">
            <FaReact className="icon" />
          </a>
          <span className="heading-name">React</span>
        </div>
        <div className="user-info">
          {user && (
            <div>
             {user &&  <h4>
                <strong>Welcome,{user.name.toUpperCase()}</strong>
              </h4>}
              {newBalance && <p>
                Balance:
                { newBalance < 0 ? 0 : newBalance.toFixed(2)}$
              </p>}
            </div>
          )}
          {user ? (
            <div>
            <button
              type="submit" onClick={logoutHandler}>Logout</button>
            <button
              type="button" onClick={openDepositModal}>Deposit</button>
              </div>
          ) : (
            <div>
              {!token &&<button type="submit" onClick={() => history('/api/v1/auth/login')}>
                Login
              </button>}
             {!token && <button type="submit"onClick={() => history('/api/v1/auth/register')}>Register</button>}
            </div>
          )}
        </div>
      </section>
    </header>
  );
}

export default Header;
