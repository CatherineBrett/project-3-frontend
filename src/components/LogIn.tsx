import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../config";

export default function Login({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    setErrorMessage("");
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem("token", resp.data.token);
      console.log(resp.data);
      fetchUser();
      navigate("/");
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  }
  console.log(formData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pd-6">
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-md rounded px-8 py-6 w-96">
          <h2 className="text-xl font-bold mb-4 text-center text-red-500">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                {errorMessage && (
                  <small className="text-red-500">{errorMessage}</small>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded px-8 py-4 w-96 mt-4">
          <p className="text-center text-sm">
            <span className="text-gray-700">Don't have an account?</span>{" "}
            <Link
              to="/signup"
              className="text-red-500 hover:text-red-400 font-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
