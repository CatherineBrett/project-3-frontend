import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import TipsList from "./components/TipsList";
import CreateTip from "./components/CreateTip";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp";
import ShowTip from "./components/ShowTip";
import EditTip from "./components/EditTip";
import UserProfile from "./components/UserProfile";
import "./styles/index.css";

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (token) {
      const resp = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(resp.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advice" element={<TipsList />} />
            <Route path="/advice/:tipId" element={<ShowTip user={user} />} />
            <Route path="/give-advice" element={<CreateTip />} />
            <Route path="/login" element={<Login fetchUser={fetchUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/advice/edit/:tipId" element={<EditTip />} />
            <Route path="/user/" element={<UserProfile />} />  
            {/*  we need to add in :userId */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
