import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    bio: "",
    gitHub: "",
    linkedIn: "",
  });
  const [bioCharCount, setBioCharCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const resp = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = resp.data;
        setFormData({
          email: userData.email,
          username: userData.username,
          bio: userData.bio,
          gitHub: userData.gitHub,
          linkedIn: userData.linkedIn,
        });
        setBioCharCount(userData.bio.length);
      }
    }
    fetchUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "bio") {
      setBioCharCount(value.length);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`/api/user/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/advice");
    } catch (error) {
      const message =
        error.response?.data || "An error occurred. Please try again later.";
      setErrorMessage(message);
    }
  }

  return (
    <section className="flex justify-center min-h-screen bg-gray-100 p-5">
      <form
        className="container mx-auto my-5 p-5 bg-gray-100"
        onSubmit={handleSubmit}
      >
        <div className="md:flex no-wrap md:-mx-2">
          {/* Left Side */}
          <div className="w-full mb-8 md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-red-400">
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {formData.username}
              </h1>
              <p className="text-gray-700 text-sm">{formData.bio}</p>
              <div className="mt-3">
                <p className="text-gray-600 text-sm">
                  Member since Nov 07, 2024
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-9/12 mb-2  h-auto border-t-4 border-red-400">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-[auto]">
                    <div className="px-4 py-2 font-semibold">Username</div>
                    <div className="px-4 py-2">{formData.username}</div>
                  </div>
                  <div className="grid grid-cols-[auto]">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">{formData.email}</div>
                  </div>
                  <div className="grid grid-cols-[auto]">
                    <div className="px-4 py-2 font-semibold">GitHub</div>
                    <input
                      type="text"
                      name="gitHub"
                      onChange={handleChange}
                      value={formData.gitHub || ""}
                      className="px-4 py-2 border rounded-md mr-12 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="grid grid-cols-[auto]">
                    <div className="px-4 py-2 font-semibold">LinkedIn</div>
                    <input
                      type="text"
                      name="linkedIn"
                      onChange={handleChange}
                      value={formData.linkedIn || ""}
                      className="px-4 py-2 border rounded-md mr-12 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="grid grid-cols-[auto] md:col-span-1 mt-3">
                    <div className="px-4 py-2 font-semibold">Bio</div>
                    <textarea
                      maxLength={500}
                      name="bio"
                      onChange={handleChange}
                      value={formData.bio}
                      className="hide-scrollbar resize-none px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 h-32 w-full"
                    ></textarea>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-xs italic">
                      {errorMessage}
                    </p>
                  )}
                  <div className="flex justify-end mt-4 md:col-span-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default UserProfile;
