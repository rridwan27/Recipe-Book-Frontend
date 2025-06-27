import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className=" py-6 px-4 md:px-10 transition-colors duration-300">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-violet-600 hover:text-violet-500 transition-colors"
        >
          <IoFastFoodOutline size={36} />
          <span className="text-gray-800 dark:text-gray-700">SpiceSpoon</span>
        </Link>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-700">
            <Mail size={20} className="text-violet-600" />
            <span>Email: rridwan27@gmail.com</span>
          </div>
          <div className="hidden md:block text-gray-400 dark:text-gray-500">
            |
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-700">
            <Phone size={20} className="text-violet-600" />
            <span>Phone: +8801722222222</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          <Link
            to="https://www.facebook.com/profile.php?id=100071921641796"
            target="_blank"
            className="text-violet-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            to="https://www.instagram.com/aarnobbb._/"
            target="_blank"
            className="text-violet-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            to="https://x.com/arnob000007"
            target="_blank"
            className="text-violet-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
          >
            <FaX size={24} />
          </Link>
          <Link
            to="https://github.com/rridwan27"
            target="_blank"
            className="text-violet-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
          >
            <FaGithub size={24} />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-dashed border-violet-400 dark:border-violet-600 my-4"></div>

      {/* Bottom Text */}
      <div className="text-center text-xs font-semibold text-gray-600 dark:text-gray-700">
        © 2025 - All rights reserved by{" "}
        <span className="text-violet-500 dark:text-violet-600">SpiceSpoon</span>
      </div>
    </div>
  );
};

export default Footer;
