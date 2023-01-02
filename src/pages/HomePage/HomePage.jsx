import React, { useEffect, useState } from "react";
import "./HomePage.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
const HomePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const blogRes = await axios.get(
        "https://dsc-api.vercel.app/api/blog/getAll"
      );
      setBlogs(blogRes.data.blogs);
    };
    getBlogs();
    const getUserDetails = () => {
      const token = localStorage.getItem('token');
      if(token){
        setUserDetails(jwtDecode(token));
      }
    };
    getUserDetails();
  }, [])
 
  return (
    <div className="h-[auto] w-full bg-slate-100 px-16 py-5 ">
      <h1 className="text-2xl font-medium mb-5">Hello <span className="capitalize"> {userDetails.name},</span></h1>
      <div className="flex gap-3 flex-col">
        <span className="text-zinc-500 text-sm">Email: <span className="text-zinc-400"> {userDetails.email} </span></span>
        <span className="text-zinc-500 text-sm">Number: <span className="text-zinc-400"> {userDetails.number} </span></span>
      </div>
      <h3 className="mt-9 text-2xl">Recent Blogs</h3>
      <div className="flex flex-wrap w-full gap-7 ">
            {blogs.length > 0 &&
              blogs.map((b, index) => {
                return (
                  <div
                    key={index}
                    className="w-[fit-content] p-4 bg-white border border-gray-200 rounded-lg shadow-md mt-5"
                  >
                      <img
                        src={b.image}
                        alt=""
                        className="h-36 w-56 rounded-sm mb-3"
                      />
                      <h5 className="text-lg font-bold tracking-tight text-zinc-600">
                        {b.title}
                      </h5>
                    <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                      {b.category}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {b.body.slice(0, 20)}...
                    </p>
                    
                  </div>
                );
              })}
          </div>
    
    </div>
  );
};

export default HomePage;
