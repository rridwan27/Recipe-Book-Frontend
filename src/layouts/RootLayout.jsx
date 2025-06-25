import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      {" "}
      {/* /bg-[linear-gradient(135deg,#0f172a,#1e293b)]/ */}
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer position="bottom" />
      <Toaster position="top-center" duration={3000} />
    </div>
  );
};

export default RootLayout;
