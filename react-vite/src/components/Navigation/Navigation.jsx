import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import CreateNotebookModal from "../Notebooks/CreateNotebook";
import CreateTaskModal from "../Tasks/CreateTaskModal";
import { useModal } from '../../context/Modal';
import AboutModal from "./AboutModal";


function Navigation() {

  const { setModalContent } = useModal();

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

  const newNotebook = () => setModalContent(<CreateNotebookModal/>)
  const about =() => setModalContent(<AboutModal/>)
  const newTask = () => setModalContent(<CreateTaskModal />)

  return (
    <>{!sessionUser ? <></> :
      <div className="navigationContainer">
        <img src="https://res.cloudinary.com/dfxxgifho/image/upload/v1710376011/EveryNote_iw1qhe.png" alt="" className="navLogo" onClick={() => navigate("/home")}/>
        <div className="buttonsBox">
          <span className="buttonsPlus">
            <button className="navButtons" onClick={handleSubmit}>Notebooks</button>
            <i className="fa-solid fa-plus" onClick={newNotebook}></i>
          </span>
          <span className="buttonsPlus">
            <button className="navButtons" onClick={handleSubmit}>Notes</button>
            <i className="fa-solid fa-plus" onClick={() => {navigate('/notes/new-note')}}></i>
          </span>
          <span className="buttonsPlus">
            <button className="navButtons" onClick={handleSubmit}>Tasks</button>
            <i className="fa-solid fa-plus" onClick={newTask}></i>
          </span>
        </div>
        <div className="container-about">
        <button onClick={logout} className="logout">Log Out</button>
        <div onClick={about}>About</div>
        </div>
      </div>
    }</>
  );
}

export default Navigation;
