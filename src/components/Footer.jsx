import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f1b] text-white h-16 w-full flex flex-col items-center justify-center border-t border-purple-900">
      <div className="font-extrabold text-xl">
        <span className="text-purple-400">&lt;</span>
        Safe
        <span className="text-purple-400">Pass/&gt;</span>
      </div>
      <p className="text-sm text-purple-400 mt-1">
        Created by{" "}
        <a
          href="https://abdulahadportfolio.tech"
          className="underline hover:text-white"
        >
          Abdul Ahad
        </a>
      </p>
    </footer>
  );
};

export default Footer;
