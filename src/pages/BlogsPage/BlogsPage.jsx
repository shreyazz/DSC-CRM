import React, { useState, useEffect } from "react";
import "./BlogsPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BlogsPage = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
    category: "",
    image: "",
  });
  useEffect(() => {
    const getBlogs = async () => {
      const blogRes = await axios.get(
        "https://dsc-api.vercel.app/api/blog/getAll"
      );
      setBlogs(blogRes.data.blogs);
    };

    getBlogs();
  }, []);
   const getBlogs = async () => {
      const blogRes = await axios.get(
        "https://dsc-api.vercel.app/api/blog/getAll"
      );
      setBlogs(blogRes.data.blogs);
    };
  const addBlog = async () => {
    const addRes = await axios.post(
      "https://dsc-api.vercel.app/api/blog/add",
      blogData
    );
    if(addRes){
      toast.success("Blog Added...!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const handleInputChange = (event) => {
    setBlogData({
      ...blogData,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  const getImgURL = (event) => {
    setSelectedImage(event.target.files[0]);
    const formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    setImageLoading(true);
    fetch("https://api.imgur.com/3/image", {
      method: "post",
      headers: {
        Authorization: "Client-ID 1e4107b48d3e3b7",
      },
      body: formdata,
    })
      .then((data) => data.json())
      .then((data) => {
        setImageLink(data.data.link);
        setBlogData({ ...blogData, image: data.data.link });
        setImageLoading(false);
      });
  };
  const deleteBlog = async (id) => {
    const deleteBlog = await axios.post(
      "https://dsc-api.vercel.app/api/blog/delete",
      { id: id }
    );
    console.log(deleteBlog);
    if(deleteBlog){
      toast.error("Blog Deleted...!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <section className=" bg-slate-100 py-3 px-4 md:px-16 h-[auto] min-h-[100vh] w-auto text-white flex flex-col justify-between sm:flex-col gap-10">
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
      <div className="container w-[100%]">
        <div className="container">
          <p className="text-xl text-zinc-700">Add Blogs</p>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={(event) => {
              handleFormSubmit(event);
            }}
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="title" className="sr-only">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Title"
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              <div className="pt-4">
                <label htmlFor="category" className="sr-only">
                  Category
                </label>
                <input
                  id="text"
                  name="category"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Category"
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              <div className="pt-4">
                <label htmlFor="password" className="sr-only">
                  body
                </label>
                <textarea
                  id="text"
                  name="body"
                  type="text"
                  required
                  className="relative block w-full resize-y appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Body"
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              <div className="pt-4">
                <input
                  className="file:bg-zinc-400  text-zinc-600 file:border-none file:outline-none file:rounded-md file:p-2 file:cursor-pointer w-full rounded-md cursor-pointer border border-gray-300  p-1 text-grey-200 placeholder-gray-500 focus:z-10"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={(event) => {
                    getImgURL(event);
                  }}
                />
                <p className="pt-2 text-zinc-500">
                  Image URL:{" "}
                  {imageLoading ? (
                    <span className="text-zinc-400">Image is loading...</span>
                  ) : (
                    <span className="text-zinc-400">{imageLink}</span>
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-10 pb-6">
                <div>
                  <p className="text-zinc-600">Local Image</p>
                  {selectedImage && (
                    <img
                      alt="not fount"
                      className="h-40 w-64 rounded-md"
                      src={URL.createObjectURL(selectedImage)}
                    />
                  )}
                </div>
                <div>
                  <p className="text-zinc-600">Uploaded Image</p>

                  {selectedImage && (
                    <img
                      alt={imageLoading ? "loading..." : "Preview Image"}
                      className="h-40 w-64 rounded-md"
                      src={imageLink}
                    />
                  )}
                </div>
              </div>

              <button
                onClick={addBlog}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent  bg-[#377AFF] py-2 px-4 text-sm font-medium text-white hover:bg-[#285abf] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-[#285abf]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-[#285abf]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </span>
                {loading ? "Loading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
        <hr className="mt-10 border-zinc-600 border-t-2" />
      </div>

      <div className="container w-[100%] h-[auto]">
        <div className="container">
          <div className="flex gap-2 items-center mb-6">
            <p className="text-2xl text-zinc-700">All Blogs</p>
            <svg
              onClick={getBlogs}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={"white"}
              className="w-7 h-7 cursor-pointer p-1 bg-zinc-500 rounded-md"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
          <div className="flex flex-wrap w-full gap-7 ">
            {blogs.length > 0 &&
              blogs.map((b, index) => {
                return (
                  <div
                    key={index}
                    className="w-[fit-content] p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                  >
                    <a href="#">
                      <img
                        src={b.image}
                        alt=""
                        className="h-24 w-48 rounded-sm mb-3"
                      />
                      <h5 className="text-lg font-bold tracking-tight text-zinc-600">
                        {b.title}
                      </h5>
                    </a>
                    <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                      {b.category}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {b.body.slice(0, 6)}...
                    </p>
                    <div
                      className="inline-flex cursor-pointer gap-2 items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg"
                      onClick={() => {
                        deleteBlog(b._id);
                      }}
                    >
                      Delete
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="white"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
