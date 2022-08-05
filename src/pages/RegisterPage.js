import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Header from "../components/Header";
import { SportContext } from "../context/context";
import "./globalPage.css";

const RegisterPage = () => {
  const history = useNavigate();

  const { loading } = useContext(SportContext);
  const { dispatch, email, password, name, register, error,user } =
    useContext(AuthContext);

  const emailHandler = (e) => {
    dispatch({ type: "ENTER_EMAIL", payload: e.target.value });
  };
  const nameHandler = (e) => {
    dispatch({ type: "ENTER_NAME", payload: e.target.value });
  };
  const passwordHandler = (e) => {
    dispatch({ type: "ENTER_PASSWORD", payload: e.target.value });
  };

  

  const submitHandler = (e) => {
    e.preventDefault();
    let formIsValid;
    if (name !== '' && email.includes('@') && password.length > 5) {
      formIsValid = true;
    }
      formIsValid && !error ? history('/') : history('/api/v1/auth/register')
  };
  return (
    <>
      <Header />
      <form onSubmit={submitHandler}>
        {error && <p className="error">{error}</p>}
        <label>
          <span>Username</span>
          <input
            type="text"
            value={name}
            onChange={(e) => nameHandler(e)}
            className={`${error ? "invalid" : null}`}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => emailHandler(e)}
            className={`${error ? "invalid" : null}`}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            className={`${error ? "invalid" : null}`}
            onChange={(e) => passwordHandler(e)}
          />
          {/* <Link to="/api/users/forgotPassword" className="forgot-pw">
            Forgot your password?
          </Link> */}
        </label>
        {loading && <button className="form-btn">Loading...</button>}
        {!loading && (
          <button
            onClick={() => register(name, email, password)}
            className="form-btn"
          >
            Sign up
          </button>
        )}
      </form>
    </>
  );
};
export default RegisterPage;
