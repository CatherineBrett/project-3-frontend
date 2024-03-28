import { SyntheticEvent, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../config";

export default function EditUser() {
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
        const resp = await axios.get(`${baseUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = resp.data;
        const userToEdit = {
          email: userData.email,
          username: userData.username,
          bio: userData.bio,
          gitHub: userData.gitHub,
          linkedIn: userData.linkedIn,
        };
        setFormData(userToEdit);
        setBioCharCount(userData.bio.length);
      }
    }
    fetchUser();
  }, []);

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    if (e.target.id === "bio") {
      setBioCharCount(e.target.value.length);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.put(`${baseUrl}/user/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(resp.data);
      navigate("/advice");
    } catch (e: any) {
      if (e.response && e.response.data) {
        setErrorMessage(e.response.data);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">
          Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="control">
              <input
                disabled
                type="text"
                name={"username"}
                id={"username"}
                value={formData.username}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div>
              <input
                disabled
                type="text"
                name={"email"}
                id={"email"}
                value={formData.email}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >{`Bio (${bioCharCount}/500)`}</label>
            <div>
              <textarea
                maxLength={500}
                name={"bio"}
                id={"bio"}
                onChange={handleChange}
                value={formData.bio}
                className="hide-scrollbar resize-none mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 h-32"
              />
              {/* {errorData.bio && (
                <small className="text-red-500">{errorData.bio}</small>
              )} Not sure about how the error stuff is set up. MB to have a look at this. */}
            </div>
          </div>
          <div>
            <label
              htmlFor="gitHub"
              className="block text-sm font-medium text-gray-700"
            >
              GitHub Link (optional):
            </label>
            <div>
              <input
                type="text"
                name={"gitHub"}
                id={"gitHub"}
                onChange={handleChange}
                value={formData.gitHub || ""}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="linkedIn"
              className="block text-sm font-medium text-gray-700"
            >
              LinkedIn Link (optional):
            </label>
            <div>
              <input
                type="text"
                name={"linkedIn"}
                id={"linkedIn"}
                onChange={handleChange}
                value={formData.linkedIn || ""}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
