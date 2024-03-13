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

  const handleSubmit = (e) => {
    console.log(e.target.innerText)
    switch (e.target.innerText) {
      case "Notebooks":
        return navigate('/notebooks');
      case "Notes":
        return navigate('/notes');
      case "Tasks":
        return navigate('/tasks');
      default:
        return ;
    }
  }

  return (
    <>{!sessionUser ? <></> :
      <div className="navigationContainer">
        <img src="../../public/EveryNote.png" alt="" className="navLogo" onClick={() => navigate("/home")}/>
        <div className="buttonsBox">
          <span className="buttonsPlus">
            <button className="navButtons" onClick={handleSubmit}>Notebooks</button>
            <i className="fa-solid fa-plus" onClick={() => alert("feature comming soon")}></i>
          </span>
          <span className="buttonsPlus">
            <button className="navButtons" onClick={handleSubmit}>Notes</button>
            <i className="fa-solid fa-plus" onClick={() => alert("feature comming soon")}></i>
          </span>
          <span className="buttonsPlus">
            <button className="navButtons" onClick={handleSubmit}>Tasks</button>
            <i className="fa-solid fa-plus" onClick={() => alert("feature comming soon")}></i>
          </span>
        </div>
        <button onClick={logout} className="logout">Log Out</button>
      </div>
    }</>
  );
}

export default Navigation;
