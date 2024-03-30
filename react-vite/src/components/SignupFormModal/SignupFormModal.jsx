import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { newNotebookThunk } from "../../redux/notebooks";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const newUserNotebook = {
    name: 'My First Notebook',
    description: 'Make more notebooks or add more notes to this one! Feel free to edit or delete this notebook to your liking.'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
    dispatch(newNotebookThunk(newUserNotebook))
  };

  return (
    <div className="signupModal">
      <h1>Sign Up</h1>
      {errors.server && <div className="error error-task">{errors.server}</div>}
      <form className="signupForm" onSubmit={handleSubmit}>

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <div className="error error-task">{errors.email}</div>}

        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <div className="error error-task">{errors.username}</div>}


        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <div className="error error-task">{errors.password}</div>}

        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <div className="error error-task">{errors.confirmPassword}</div>}

        <button className="new-note-submit save-disable" type="submit" disabled={!username || !password || !confirmPassword || !email}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
