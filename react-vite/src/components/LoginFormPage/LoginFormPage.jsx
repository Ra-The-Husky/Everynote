import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/home" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="mainWrapper">
      <div className="innerWrapper">
        <img src="../../public/EveryNote-trans.png" />

        <h1>Log In</h1>
        {errors.length > 0 &&
          errors.map((message) => <div className="error" key={message}>{message}</div>)}
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* {errors.email && <p>{errors.email}</p>} */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span hidden={!errors.password || !errors.email} className="error">{errors.password || errors.email}</span>
          <span className="signupLink">
          <OpenModalMenuItem
            itemText="Don't have an account? Sign up NOW!"
            modalComponent={<SignupFormModal />}
          />
          </span>
          <div className="loginButtons">
            <button className="logout" type="submit">Log In</button>
            <button
              className="logout"
              type="submit"
              onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
