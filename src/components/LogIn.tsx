import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
      const resp = await axios.post("/api/login", formData);
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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <div>
              <input
                type="text"
                name={"email"}
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <input
                type="password"
                name={"password"}
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            {errorMessage && <small>{errorMessage}</small>}
          </div>
          <button>Submit</button>
          <div className="h-dvh">
            <h1 className="items=center text-center ">Welcome to the Login Page!</h1>
          </div>
        </form>
        <div><div>Don't have an account?
        </div>
          <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400">
            <Link to="/signup">
              Sign up!
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
