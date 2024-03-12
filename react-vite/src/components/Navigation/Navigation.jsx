import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const logout = async (e) => {
    e.preventDefault();

    await dispatch(thunkLogout())
    .then(()=>navigate("/"));
  };

  return (
    <>{!sessionUser ? <></> : <button onClick={logout}>Log Out</button>}</>
  );
}

export default Navigation;
