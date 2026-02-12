import axios from "axios";
import { useEffect, useState } from "react";

const Register = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="bg-white border-2 border-solid blue-border w-[60vw] h-[30vw] absolute top-[20%] left-[20%] m z-20 ">
      <form className="grid grid-cols-3  gap-4 w-fill m-10 mt-16 gap-y-10">
        <input
          className="border-2 border-solid blue-border h-8 col-start-1"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" Numer NIP"
        />
        <input
          className="border-2 border-solid blue-border h-8"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" Nazwa Firmy"
        />
        <input
          className="border-2 border-solid blue-border h-8 col-start-1"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" Adres"
        />
        <input
          className="border-2 border-solid blue-border h-8"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" Kod pocztowy"
        />
        <input
          className="border-2 border-solid blue-border h-8 col-span-1 "
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" Miasto"
        />

        <input
          className="border-2 border-solid blue-border h-8"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" Nazwa Użytkownika"
        />
        <input
          className=" border-2 border-solid blue-border h-8"
          placeholder=" Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className=" border-2 border-solid blue-border h-8"
          placeholder=" Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-[100%]  blue-background text-white font-semibold h-8 col-start-2"
          type="submit"
        >
          Register
        </button>
        <p>{message}</p>
      </form>
      <h2 className="blue-font text-center">
        Do you already have an account? Click here to{" "}
        <span
          onClick={onClose}
          className="cursor-pointer font-dark-blue underline"
        >
          Log in!
        </span>
      </h2>
    </div>
  );
};

export default Register;
