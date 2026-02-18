import logoBlack from "../assets/logo-black.png";
import { useNavigate } from "react-router-dom";
import settings from "../assets/settings.png";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [toDelete, setToDelete] = useState(false);

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/");
  }

  async function handleDelete() {
    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://127.0.0.1:8000/api/users/delete-me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      alert("Your account has been deleted.");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to delete your account");
    }
  }
  return (
    <div className="border-2 border-solid blue-border h-14 absolute w-full top-0 flex flex-row items-center justify-between ">
      <div className="flex flex-row">
        <img
          src={logoBlack}
          alt="post it note icon"
          className="h-8 m-2 ml-10"
        />
        <h2 className="text-center self-center font">NoteBox</h2>
      </div>
      <div onClick={() => setIsClicked((prev) => !prev)}>
        <img src={settings} alt="settings" className="h-6 mr-10" />
      </div>
      {isClicked && (
        <div className="absolute flex flex-col right-0 top-14 w-48 h-30 bg-white p-8 z-10 border-2 border-solid blue-border ">
          <button onClick={logOut} className="text-start">
            Log out
          </button>
          <button className="text-start" onClick={() => setToDelete(true)}>
            Delete account
          </button>
        </div>
      )}
      {toDelete && (
        <ConfirmDelete
          onConfirm={handleDelete}
          onCancel={() => setToDelete(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
