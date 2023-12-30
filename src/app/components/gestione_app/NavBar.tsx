import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(): JSX.Element {
  return (
    <ul>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/Form'}>Form</Link>
      </li>
      <li>
        <Link to={'/Lista'}>Lista</Link>
      </li>
      <li>
        <Link to={'/SignUp'}>SignUp</Link>
      </li>
      <li>
        <Link to={'/Login'}>Login</Link>
      </li>
    </ul>
  );
}

export default NavBar;
