import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Header from "../components/Header";
import { SportContext } from "../context/context";
import "./globalPage.css";

const LoginPage = () => {
  const history = useNavigate();

  const { loading } = useContext(SportContext);
  const { login, dispatch, email, password, error } = useContext(AuthContext);

  const emailHandler = (e) => {
    dispatch({ type: "ENTER_EMAIL", payload: e.target.value });
  };
  const passwordHandler = (e) => {
    dispatch({ type: "ENTER_PASSWORD", payload: e.target.value });
  };

  

  const submitHandler = (e) => {
    e.preventDefault();
    let formIsValid = false;
  
      login(email,password,history)
    
  };

  return (
    <>
      <Header />
      <form onSubmit={submitHandler}>
        {error && <p className="error">{error}</p>}
        <label>
          <span>Email</span>
          <input
            type="email"
            className={`${error ? "invalid" : null}`}
            value={email}
            onChange={(e) => emailHandler(e)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => passwordHandler(e)}
            className={`${error ? "invalid" : null}`}
          />
        </label>
        {loading && <button className="form-btn">Loading...</button>}

        {!loading && (
          <button
            className="form-btn"
            type="submit"
          >
            Login
          </button>
        )}
      </form>
    </>
  );
};
export default LoginPage;
