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
      .then(() => navigate("/"));
  };

  return (
    <>{!sessionUser ? <></> :
      <div className="navigationContainer">
        <img src="../../public/EveryNote.png" alt=""  className="navLogo"/>
        <div className="buttonsBox">
          <button className="navButtons">NoteBooks</button>
          <button className="navButtons">Notes</button>
          <button className="navButtons">Tasks</button>
        </div>
        <button onClick={logout} className="logout">Log Out</button>
      </div>
    }</>
  );
}

export default Navigation;
