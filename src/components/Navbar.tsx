import { Link, useNavigate } from "react-router-dom";
import { closeOutline, menuOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useState } from "react";
import { IUser } from "../interfaces/user"

interface NavbarProps {
  user: null | IUser
  setUser: Function
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

  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
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
              alt="BB Logo"
            />
            <div
              className={`${isMenuOpen ? "block" : "hidden"
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
                <li>
                  <Link to="/give-advice" className="hover:text-red-500">
                    Give Advice
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {!user && <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400">
              <Link to="/login">Login</Link>
            </button>}
            {user && <button onClick={logout} className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400">
              Log Out
            </button>}
            <IonIcon
              onClick={toggleMenu}
              icon={isMenuOpen ? closeOutline : menuOutline}
              className="text-3xl cursor-pointer md:hidden"
            />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
