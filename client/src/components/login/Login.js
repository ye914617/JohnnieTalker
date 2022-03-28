import React, { useState } from "react";
import { useGlobalContext } from "../../global/GlobalContext";

const Login = () => {
  const { userRegister } = useGlobalContext();
  const [registerName, setRegisterName] = useState("");

  const validationName = async (name) => {
    if (name.length < 1) {
      alert("Username cannot be empty!");
    } else {
      await userRegister(name);
    }
  };

  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <p className="text-white text-3xl font-bold text-center">
          Welcome to JohnnieTalker
        </p>
        <input
          type="text"
          required={true}
          placeholder="Login as..."
          minLength="1"
          maxLength="10"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          className="bg-slate-800 text-white pl-4 sm:pl-2 rounded-lg my-8 outline-none focus:outline-violet-600 w-10/12 md:w-1/3 h-12"
        ></input>
        <button
          onClick={() => validationName(registerName)}
          className="bg-pink-500 font-bold text-lg rounded-lg hover:bg-pink-700 text-white w-10/12 md:w-1/3 h-12"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Login;
