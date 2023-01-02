import React, {useEffect, useState} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import BlogsPage from "./pages/BlogsPage/BlogsPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
const App = () => {
  const [tokenPresent, setTokenPresent] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenPresent(true);
    } else {
      setTokenPresent(false);
    }
  }, []);

  const navigate = useNavigate();
  return (
    <div>
    <Navbar/>
    <Routes>
        {tokenPresent ? <Route path="/" index element={<HomePage/>}/> :  <Route path="/" index element={<div className="h-[90vh] w-full bg-slate-100 px-16 py-5 flex items-center justify-center"><h1 className="text-red-600 text-4xl"> Not Authorized </h1></div>}/>}
        {tokenPresent ? <Route path="/blogs"  element={<BlogsPage/>}/> :  <Route path="/" index element={<div className="h-[90vh] w-full bg-slate-100 px-16 py-5 flex items-center justify-center"><h1 className="text-red-600 text-4xl"> Not Authorized </h1></div>}/>}
        <Route path="/login"  element={<LoginPage/>}/>
    </Routes>
    </div>

  );
};

export default App;
