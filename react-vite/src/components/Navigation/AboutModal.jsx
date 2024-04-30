// import { useModal } from "../../context/Modal";
import "./AboutModal.css";

function AboutModal() {
  return (
    <div className="about-modal">
      <h2>EVERYNOTE</h2>
      <p>
        Everynote is a useful application that lets users create and manage
        notes and tasks efficiently. With Everynote, users have the ability to
        organize their notes into different notebooks, allowing for a
        personalized and organized note-taking experience tailored to their
        preferences. We understand that most people prefer to keep their notes
        and tasks for themselves, but not in a way that results in cluttered and
        disorganized files. That's why we developed Everynote—to provide a
        solution that helps users maintain their notes and tasks in a structured
        and user-friendly manner. Whether you're jotting down ideas, creating
        to-do lists, or organizing thoughts, Everynote offers the tools you need
        to keep everything neatly organized and easily accessible.
      </p>
      <h4 style={{borderBottom: "solid 1px black", width: "100%", textAlign: "center", fontSize: "1.5rem", paddingBottom: "15px"}}>Created by:</h4>
      <div className="contributers">
        <h3>Andrew McCord</h3>
        <a href="https://github.com/a2011mccord">a2011mccord</a>

        <h3>Zack Stephens</h3>
        <a href="https://github.com/ZackStephens92">ZackStephens92</a>

        <h3>Rasheed Lindsey</h3>
        <a href="https://github.com/Ra-The-Husky">Ra-The-Husky</a>

        <h3>Mohammad Najad</h3>
        <a href="https://github.com/Mjcoco09" style={{paddingBottom: "10%"}}>Mjcoco09</a>

        <p>
          For feedback feel free to
          contact us via email or connect with us on GitHub.
        </p>

        <h4 style={{fontSize: "1.15rem"}}>Get in Touch:</h4>
        <p >Email:comingSoon@noEmail.com</p>
        <a href="https://github.com/Ra-The-Husky/Everynote/">
          Everynote GitHub
        </a>
      </div>
    </div>
  );
}

export default AboutModal;
