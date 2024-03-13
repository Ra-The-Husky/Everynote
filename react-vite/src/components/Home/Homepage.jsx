import { useDispatch, } from "react-redux";
import { useState } from "react";
import { noteThunk } from "../../redux/home";







function Homepage() {
  const dispatch = useDispatch();
  const [notes,setNotes] = useState([])
  const getNotes= async() => {
    await dispatch(noteThunk()).then((e)=>setNotes(e))
  }
  getNotes()
  console.log(notes)
  return (
    <div className="HomePage" >
      <p>Image will go here</p>
      <h2>Users Home</h2>
      <div>
        <div>Notebook 1</div>
        <div>
          <div>
            <h4>note 1</h4>
            <h4>content..... </h4>
            <p>tag 1</p>
          </div>
          <div>
            <h4>note 2</h4>
          </div>
          <div>
            <h4>note 3</h4>
          </div>
        </div>
        <div>
          <h3>Recent Tasks</h3>
          <ol>
            <li>task 1</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
