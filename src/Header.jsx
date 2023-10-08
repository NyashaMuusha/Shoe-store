import React from "react";
import { Link, useLocation } from "react-router-dom";

const activeStyle = {
  color: "purple",
};

function Header() {
  const location = useLocation();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <Link
              style={location.pathname === "/shoes" ? activeStyle : {}}
              to="/shoes"
            >
              Shoes
            </Link>
          </li>
          <li>
            <Link
              style={location.pathname === "/cart" ? activeStyle : {}}
              to="/cart"
            >
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
