import "./styles/index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TipsList from "./components/TipsList";
import CreateTip from "./components/CreateTip";
import Login from "./components/LogIn";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

const [user, setUser] = useState(null);

async function fetchUser() {
  const token = localStorage.getItem("token");
  const resp = await axios.get("/api/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  setUser(resp.data);
}

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) fetchUser();
}, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advice" element={<TipsList />} />
        <Route path="/create-advice" element={<CreateTip />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
