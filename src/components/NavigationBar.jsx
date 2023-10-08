import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const [click, SetClick] = useState(false);
  const [selected, setSelected] = useState("HOME");
  const menu = [
    { name: "HOME", to: "/" },
    { name: "SIGN IN", to: "/signin" },
    { name: "JOIN NOW", to: "/signup" },
  ];

  return (
    <header className="bg-transparent p-3 relative">
      <div className="max-w-7xl flex items-center justify-between mx-auto">
        <h1 className="text-xl">
          Labeta <span className="text-slate-400">Stores</span>
        </h1>
        <form className="flex items-center gap-1 bg-slate-800 py-1 px-2 rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md focus:outline-none bg-transparent w-32 sm:w-52 md:w-60"
          />
          <FaSearch className="text-slate-400" />
        </form>
        <div
          className="sm:hidden text-2xl smooth"
          onClick={() => SetClick(!click)}
        >
          {!click ? <FiMenu /> : <AiOutlineClose />}
        </div>
        <div className="hidden sm:flex gap-3 text-slate-400">
          {menu.map((itm, index) => (
            <Link
              to={`${itm.to}`}
              key={index}
              className={`${
                itm.name === selected
                  ? "border-b-2 text-white"
                  : "hover:text-white smooth"
              }`}
              onClick={()=>setSelected(itm.name)}
            >
              {itm.name}
            </Link>
          ))}
        </div>
        <div className={ !click ? `hidden` : `flex absolute sm:hidden text-slate-400 right-4 top-full flex-col p-8 gap-4 bg-slate-800 rounded-s-md`}>
          {menu.map((itm, index) => (
            <Link
              to={`${itm.to}`}
              key={index}
              className={`${
                itm.name === selected
                  ? "border-b-2 text-white"
                  : null
              }`}
              onClick={()=>setSelected(itm.name)}
            >
              {itm.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
