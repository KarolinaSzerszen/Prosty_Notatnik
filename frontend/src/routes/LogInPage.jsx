import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../App.css";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });
      setMessage(res.data.message);
      login(res.data.access);
      if (res.status === 200) {
        console.log(username);

        navigate("/HomePage");
      }
    } catch (err) {
      if (err.response) {
        setMessage("Invalid credentials");
      } else {
        setMessage("Network error");
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row min-w-full h-[100vh] m-0 p-0">
      <div className="blue-background ] w-[100%] sm:w-[50%] h-fill text-white flex flex-col justify-center items-center pb-16 sm:pb-0">
        <h1 className="text-4xl font-semibold mb-10 mt-10 sm:mt-0 select-none">
          NoteBox
        </h1>
        <img
          src={logo}
          alt="sticky note logo"
          className="w-48 mb-10 select-none "
        />
        <h2 className="text-2xl select-none">
          Perfect place to store your notes
        </h2>
      </div>
      <div className="w-[100%] sm:w-[50%] flex flex-col justify-center items-center mt-14 sm:mt-0">
        <h2 className="blue-font text-2xl font-semibold select-none">
          Log in to acces your notes
        </h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col m-10 gap-8 w-[50%]"
        >
          <input
            className="border-2 border-solid blue-border h-8 pl-2"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="w-[100%] border-2 border-solid blue-border h-8 pl-2"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-[40%]  self-center blue-background text-white font-semibold h-8 select-none"
            type="submit"
          >
            Login
          </button>
          <p>{message}</p>
        </form>

        <h2 className="blue-font mb-10 sm:mb-0 select-none">
          Don't have an account yet? Make one now!{" "}
          <span
            className="cursor-pointer font-dark-blue underline select-none"
            onClick={() => setShowRegister(true)}
          >
            Register
          </span>
        </h2>
      </div>
      {showRegister && (
        <Register
          setShowRegister={setShowRegister}
          onClose={() => setShowRegister(false)}
        />
      )}
    </div>
  );
};

export default LogInPage;
