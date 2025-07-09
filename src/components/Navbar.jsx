import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#0f0f1b] text-white shadow-md shadow-purple-500/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 h-16">
        <div className="logo font-extrabold text-3xl tracking-tight">
          <span className="text-purple-400">&lt;</span>
          Safe
          <span className="text-purple-400">Pass/&gt;</span>
        </div>

        <a
          className="flex items-center bg-purple-600 hover:bg-purple-500 transition-all px-5 py-2 rounded-full text-white font-semibold shadow-md"
          href="https://github.com/AbdulAhad56"
          target="_blank"
        >
          <img
            className="invert w-5 mr-2"
            src="/icons/github.png"
            alt="github"
          />
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
