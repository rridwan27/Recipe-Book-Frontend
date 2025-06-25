import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-[#0a1128] text-white py-6 px-4 md:px-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-violet-600"
        >
          <IoFastFoodOutline size={36} />
          <span className="text-white">SpiceSpoon</span>
        </Link>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Mail size={20} />
            <span>Email: rridwan27@gmail.com</span>
          </div>
          <div className="hidden md:block">|</div>
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <span>Phone: +8801722222222</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          <Link
            to="https://www.facebook.com/profile.php?id=100071921641796"
            target="_blank"
          >
            <FaFacebook
              size={24}
              className="text-violet-600 hover:text-violet-400 transition"
            />
          </Link>
          <Link to="https://www.instagram.com/aarnobbb._/" target="_blank">
            <FaInstagram
              size={24}
              className="text-violet-600 hover:text-violet-400 transition"
            />
          </Link>
          <Link to="https://x.com/arnob000007" target="_blank">
            <FaX
              size={24}
              className="text-violet-600 hover:text-violet-400 transition"
            />
          </Link>
          <Link to="https://github.com/rridwan27" target="_blank">
            <FaGithub
              size={24}
              className="text-violet-600 hover:text-violet-400 transition"
            />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-dashed border-violet-600 my-4"></div>

      {/* Bottom Text */}
      <div className="text-center text-xs font-semibold">
        © 2025 - All rights reserved by{" "}
        <span className="text-violet-500">SpiceSpoon</span>
      </div>
    </div>
  );
};

export default Footer;
