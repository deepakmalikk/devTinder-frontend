import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content w-full">
      <div className="container mx-auto px-3 py-3 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-center sm:text-left text-sm">
          © 2025 devTinder Web Application — All Rights Reserved
        </p>

        <div className="flex gap-4 mt-3 sm:mt-0 text-sm">
          <Link to="/about" className="hover:underline text-white">
            About
          </Link>
          <Link to="/privacy" className="hover:underline text-white">
            Privacy Policy
          </Link>
        </div>

        <div className="flex gap-4 mt-3 sm:mt-0">
          <a href="#" className="hover:text-primary">
            <i className="fa-brands fa-github text-xl"></i>
          </a>
          <a href="#" className="hover:text-primary">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
          <a href="#" className="hover:text-primary">
            <i className="fa-brands fa-twitter text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
