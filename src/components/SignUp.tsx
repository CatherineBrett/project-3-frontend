import { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    bio: "",
  });

  const [errorData, setErrorData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    bio: "",
  });

  const [bioCharCount, setBioCharCount] = useState(0);
  
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
        try {
            e.preventDefault();
            const resp = await axios.post("/api/signup", formData);
            console.log(resp.data);
            
            navigate("/login");
        } catch (e: any) {
            setErrorData(e.response.data.errors);
        }
    }
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [formData.bio]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">
          Sign Up
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
                type="text"
                name={"username"}
                id={"username"}
                onChange={handleChange}
                value={formData.username}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {errorData.username && (
                <small className="text-red-500">{errorData.username}</small>
              )}
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
                type="text"
                name={"email"}
                id={"email"}
                onChange={handleChange}
                value={formData.email}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {errorData.email && (
                <small className="text-red-500">{errorData.email}</small>
              )}
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
                name={"password"}
                id={"password"}
                onChange={handleChange}
                value={formData.password}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {errorData.password && (
                <small className="text-red-500">{errorData.password}</small>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div>
              <input
                type="password"
                name={"passwordConfirmation"}
                id={"passwordConfirmation"}
                onChange={handleChange}
                value={formData.passwordConfirmation}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {errorData.passwordConfirmation && (
                <small className="text-red-500">
                  {errorData.passwordConfirmation}
                </small>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >{`Bio (${bioCharCount}/500)`}</label>
            <div>
              <textarea
                ref={textAreaRef}
                maxLength={500}
                name={"bio"}
                id={"bio"}
                onChange={handleChange}
                value={formData.bio}
                className="hide-scrollbar resize-none mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 h-32"
              />
              {errorData.bio && <small>{errorData.bio}</small>}
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
