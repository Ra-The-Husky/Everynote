import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/')
  };

  return (
        <button onClick={logout}>Log Out</button>
  );
}

export default Navigation;
