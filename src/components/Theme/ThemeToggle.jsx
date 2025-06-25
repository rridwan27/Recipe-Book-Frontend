import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-outline mr-5">
      {theme === "dark" ? (
        <div className="flex items-center gap-2">
          {" "}
          <Sun /> <span className="hidden md:block">Light</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {" "}
          <Moon /> <span className="hidden md:block">Dark</span>
        </div>
      )}{" "}
      <span className="hidden md:block">Mode</span>
    </button>
  );
};

export default ThemeToggle;
