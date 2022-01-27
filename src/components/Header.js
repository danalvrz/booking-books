import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="menuContainer container flex h-24 border-b border-slate-300 mr-0 max-w-screen-2xl bg-white">
      <h1 className="text-3xl text-sky-600 font-bold font-Montserrat pl-24 py-8">Bookstore CMS</h1>
      <nav className="menuList font-Montserrat text-sm py-10 pl-20 ">
        <Link to="/" className="tracking-[.18em] pr-10">BOOKS</Link>
        <Link to="/categories" className="tracking-[.18em] text-slate-400 ">CATEGORIES</Link>
      </nav>
    </header>
  );
}

export default Header;
