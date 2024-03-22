import { Link } from "react-router-dom";
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

  console.log("Menu state:", isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu state after toggle:", !isMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md py-2">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div>
            <img
              className="w-16 mt-2"
              src="../src/assets/bbtransparentbg.png"
              alt="BB Logo"
            />
          </div>
          <div
            className={`md:static ${
              isMenuOpen ? "top-0" : "top-[-100%]"
            } transition-top duration-300 ease-in-out absolute bg-white md:min-h-fit min-h-[60vh] left-0 md:w-auto w-full flex items-center px-5`}
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
                  Create Advice
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400">
              <Link to="/login">
              Login
              </Link>
            </button>
            <ion-icon
              onClick={toggleMenu}
              name={isMenuOpen ? "close" : "menu"}
              class="text-3xl cursor-pointer md:hidden"
            ></ion-icon>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
