import { Link } from "react-router-dom";
import { closeOutline, menuOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md py-2">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div className="flex items-center">
            <img
              className="w-16 mt-2 mr-4"
              src="../src/assets/bbtransparentbg.png"
              alt="BB Logo"
            />
            <div
              className={`${isMenuOpen ? "block" : "hidden"} md:block transition duration-300 ease-in-out`}
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
                  <Link to="/create-advice" className="hover:text-red-500">
                    Give Advice
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400">
              <Link to="/login">Login</Link>
            </button>
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
