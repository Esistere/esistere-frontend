import { Link } from 'react-router-dom';
import React from 'react';
import { HOME } from 'app/config';

function Navbar(): JSX.Element {
  return (
    <ul className="navbar">
      <li>
        <Link to={`/${HOME}`}>Home</Link>
      </li>
      <li>
        <Link to={`/${HOME}/login`}>Login</Link>
      </li>
      <li>
        <Link to={`/${HOME}/registrazione`}>Registrazione</Link>
      </li>
      <li>
        <Link to={`/${HOME}/formPaziente`}>FormPaziente</Link>
      </li>
    </ul>
  );
}

export default Navbar;