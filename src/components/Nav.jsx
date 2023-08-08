import React from 'react';
import Account from './Account';

import className from "../styles/Nav.module.css";

import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-bg.png';


export default function Nav() {
  return (
    <nav className={className.nav}>
      <ul>
        <li>

          <Link to='/' className={className.brand}>

            <img src={logo} alt="Learn with Sumit Logo" />
            <h3>Learn with Sumit</h3>
          </Link>

        </li>
      </ul>
        <Account/>
    </nav>
  )
}
