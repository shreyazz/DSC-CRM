import axios from "axios";
import React, { useState } from "react";
import "./LoginPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    pin: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInpChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };
  const login = async () => {
    setLoading(true);
    try {
      const loginRes = await axios.post(
        "https://dsc-api.vercel.app/api/auth/login",
        { email: loginData.email, pin: loginData.pin }
      );
      console.log(loginRes.data);
      if (loginRes) {

        localStorage.setItem("token", loginRes.data.token);
        toast.success("Logged In!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);

        setInterval(() => {
          navigate('/', {replace: true});
          window.location.reload();
        }, 1200);

      }
    } catch (error) {
      toast.error("Something's wrong...!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }

  };
  return (
    <div className="h-[90vh] w-full bg-slate-100 px-16 py-5 flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="p-5 bg-zinc-200 rounded-sm flex items-center justify-center gap-5 flex-col">
        <h1 className="text-2xl font-medium text-blue-600">Deshmukh&Co CRM</h1>
        <input
          type="text"
          placeholder="Email"
          className="p-2 rounded-md outline-none w-full"
          name="email"
          onChange={(event) => handleInpChange(event)}
        />
        <input
          type="password"
          placeholder="Pin"
          className="p-2 rounded-md outline-none w-full"
          name="pin"
          onChange={(event) => handleInpChange(event)}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white py-1 px-8 rounded-md hover:bg-blue-700 ease-in transition-all duration-150"
          onClick={login}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
