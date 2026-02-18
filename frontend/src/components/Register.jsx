import axios from "axios";
import { useEffect, useState } from "react";
import cross from "../assets/cross.png";

const Register = ({ onClose, setShowRegister }) => {
  const [nip, setNip] = useState("");
  const [form, setForm] = useState({
    name: "",
    statusVat: "",
    regon: "",
    workingAddress: "",
    username: "",
    password: "",
    passwordSecond: "",
  });
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  const [success, setSuccess] = useState(false);

  async function fetchCompany(nip) {
    if (nip.length !== 10) {
      throw new Error("Invalid NIP");
    }
    const res = await axios.get(`http://127.0.0.1:8000/api/nip/?nip=${nip}`);
    return res.data;
  }

  async function handleFetch() {
    try {
      const data = await fetchCompany(nip);
      setForm({
        name: data.name || "",
        statusVat: data.statusVat || "",
        regon: data.regon || "",
        workingAddress: data.workingAddress || "",
        username: "",
        password: "",
        passwordSecond: "",
      });
      setError("");
    } catch (err) {
      setError("Company not found");
    }

    console.log(form);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nip) {
      setError("Include NIP");

      return;
    }

    if (password !== passwordSecond) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        nip,
        company_name: form.name,
        status_vat: form.statusVat,
        working_address: form.workingAddress,
        regon: form.regon,
        username,
        password,
        passwordSecond,
      });
      setError("");
      setSuccess(true);
    } catch (err) {
      console.log(err.response?.data);

      if (err.response?.status === 400) {
        setError("User already exists");
      } else {
        setError("Registration failed");
      }
    }
  }

  return success ? (
    <div className="bg-white border-2 border-solid blue-border w-[90vw] p-60  sm:w-[70vw] lg:w-[60vw]  absolute top-[16%] left-[4%] sm:left-[12%] lg:left-[20%] m z-20 flex items-center justify-center ">
      <button
        onClick={() => setShowRegister(false)}
        className="absolute right-4 top-4 text-xl cursor-pointer"
      >
        <img src={cross} className="h-4" />
      </button>

      <h2 className="blue-font text-xl">
        User created successfully! Click here to{" "}
        <span
          onClick={onClose}
          className="cursor-pointer font-dark-blue underline"
        >
          Log in!
        </span>
      </h2>
    </div>
  ) : (
    <div className="bg-white border-2 border-solid blue-border w-[90vw]  sm:w-[70vw] lg:w-[60vw] absolute top-[16%] left-[4%] sm:left-[12%] lg:left-[20%] z-20  pb-10">
      <button
        onClick={() => setShowRegister(false)}
        className="absolute right-4 top-4 text-xl cursor-pointer"
      >
        <img src={cross} className="h-4" />
      </button>
      <form
        className="grid grid-cols-3  gap-4  m-10 mt-16 gap-y-10"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col">
          NIP number
          <input
            name="nip"
            className="border-2 border-solid blue-border h-8 "
            type="text"
            onChange={(e) => setNip(e.target.value)}
            onBlur={handleFetch}
            placeholder=" NIP numer"
          />
        </label>
        <label className="flex flex-col">
          Company name
          <input
            name="name"
            className="border-2 border-solid blue-border h-8"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder=" Company name"
          />
        </label>
        <label className="flex flex-col row-start-2 col-start-1">
          Regon
          <input
            name="regon"
            className="border-2 border-solid blue-border h-8 "
            type="text"
            value={form.regon}
            onChange={handleChange}
            placeholder=" Regon"
          />
        </label>
        <label className="flex flex-col row-start-2 col-start-2">
          Status Vat
          <input
            name="statusVat"
            className="border-2 border-solid blue-border h-8"
            type="text"
            value={form.statusVat}
            onChange={handleChange}
            placeholder=" Status Vat"
          />
        </label>
        <label className="flex flex-col row-start-2 col-start-3">
          Working address
          <input
            name="workingAddress"
            className="border-2 border-solid blue-border h-8 "
            type="text"
            value={form.workingAddress}
            onChange={handleChange}
            placeholder=" Working address"
          />
        </label>
        <label className="flex flex-col row-start-3 col-start-1">
          Username
          <input
            name="username"
            className="border-2 border-solid blue-border h-8"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" Username"
          />
        </label>
        <label className="flex flex-col row-start-3 col-start-2">
          Password
          <input
            name="password"
            className=" border-2 border-solid blue-border h-8"
            placeholder=" Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="flex flex-col row-start-3 col-start-3">
          Password
          <input
            name="passwordSecond"
            className=" border-2 border-solid blue-border h-8 "
            placeholder=" Password"
            type="password"
            onChange={(e) => setPasswordSecond(e.target.value)}
          />
        </label>
        <button
          className="w-[100%]  blue-background text-white font-semibold h-8 col-start-2"
          type="submit"
        >
          Register
        </button>
        {error && <p>{error}</p>}
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
