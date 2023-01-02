import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
const Navbar = () => {
  const navigate = useNavigate();

  const [tokenPresent, setTokenPresent] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenPresent(true);
    } else {
      setTokenPresent(false);
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className="py-6 px-16 bg-white flex items-center justify-between w-full flex-row flex-wrap">
      <div
        className="logo cursor-pointer"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        <img src={logo} alt="deshmukh & Co Logo" />
      </div>
      <ul className="flex list-none gap-5 items-center justify-center">
        
        <li>
          <Link
            to={"/blogs"}
            className="bg-blue-500 p-2 rounded-sm text-white hover:bg-blue-700 ease-in transition-all"
          >
            {" "}
            Manage Blogs{" "}
          </Link>
        </li>
        {!tokenPresent ? <li>
          <Link
            to={"/login"}
            className="bg-blue-500 p-2 rounded-sm text-white hover:bg-blue-700 ease-in transition-all"
          >
            {" "}
            Login{" "}
          </Link>
        </li> : <li  className="bg-red-500 p-2 rounded-sm text-white hover:bg-red-700 ease-in transition-all cursor-pointer" onClick={logout}>
           Logout
        </li>}
      </ul>
    </div>
  );
};

export default Navbar;
