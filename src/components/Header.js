import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="menuContainer">
      <h1>Bookstore CMS</h1>
      <nav className="menuList">
        <Link to="/">Books</Link>
        |
        <Link to="/categories">Categories</Link>
      </nav>
    </header>
  );
}

export default Header;
