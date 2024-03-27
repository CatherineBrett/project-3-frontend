import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-300 border-t border-gray-400 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-0">
            <Link
              to="/"
              className="mb-4 md:mb-0 md:mr-6 text-gray-700 hover:text-gray-900 text-sm font-semibold leading-relaxed"
            >
              Home
            </Link>
            <Link
              to="/advice"
              className="mb-4 md:mb-0 md:mr-6 text-gray-700 hover:text-gray-900 text-sm font-semibold leading-relaxed"
            >
              Advice
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <FontAwesomeIcon icon={faFacebook} style={{ fontSize: "24px" }} />
            <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "24px" }} />
            <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "24px" }} />
            <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: "24px" }} />
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-6 md:mt-8">
        ©Bootcamp Buddy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
