import { Link, useNavigate } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { IUser } from "../interfaces/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  user: null | IUser;
  setUser: Function;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

function Navbar({ user, setUser }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md py-2">
        <nav className="flex justify-between items-center w-[92%] mx-auto pb-8">
          <div className="flex items-center">
            <img
              className="w-16 mt-2 mr-4"
              src="../src/assets/bbtransparentbg.png"
              alt="Bootcamp Buddy Logo"
            />
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:block transition duration-300 ease-in-out`}
            >
              <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-lg font-medium">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/advice" className="hover:text-red-500">
                    Advice
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link to="/give-advice" className="hover:text-red-500">
                      Give Advice
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="text-2xl text-gray-700"
                />
                <span className="text-gray-800 font-bold pr-4 text-xs lg:text-base">
                  {user.username}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400">
                <Link to="/login">Login</Link>
              </button>
            )}
            <FontAwesomeIcon
              onClick={toggleMenu}
              icon={isMenuOpen ? faTimes : faBars}
              className="text-2xl cursor-pointer md:hidden"
            />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
