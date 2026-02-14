import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../App.css";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });
      setMessage(res.data.message);
      if (res.status === 200) {
        navigate("/HomePage");
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Network error");
      }
    }
  }

  return (
    <div className="flex flex-row min-w-full h-[100vh] m-0 p-0">
      <div className="blue-background w-[50%] h-fill text-white flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold mb-10">NoteBox</h1>
        <img src={logo} alt="sticky note logo" className="w-48 mb-10" />
        <h2 className="text-2xl">Perfect place to store your notes</h2>
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center">
        <h2 className="blue-font text-2xl font-semibold">
          Log in to acces your notes
        </h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col m-10 gap-8 w-[50%]"
        >
          <input
            className="border-2 border-solid blue-border h-8"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
          />
          <input
            className="w-[100%] border-2 border-solid blue-border h-8"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-[40%]  self-center blue-background text-white font-semibold h-8"
            type="submit"
          >
            Login
          </button>
          <p>{message}</p>
        </form>

        <h2 className="blue-font">
          Don't have an account yet? Make one now!{" "}
          <span
            className="cursor-pointer font-dark-blue underline"
            onClick={() => setShowRegister(true)}
          >
            Register
          </span>
        </h2>
      </div>
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default LogInPage;
