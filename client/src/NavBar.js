import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <>
    <nav className="navbar navbar-expand-lg navbar-custom bg-church">
    <div className="d-flex w-50 order-0">
        <Link to="/" className="navbar-brand">ReadMe News</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
    </div>
        <div className="collpase navbar-collapse justify-content-center order-2" id="collapsingNavbar">
            <ul className="navbar-nav top-nav mb-6 nav-color navbar-font-family">
                <li className="navbar-item m-2">
                    <Link to="/politics" className="nav-link">Politics</Link>
                </li>
                <li className="navbar-item m-2">
                    <Link to="/technology" className="nav-link">Tech</Link>
                </li>
                <li className="navbar-item m-2">
                    <Link to="/sports" className="nav-link">Sports</Link>
                </li>
            </ul>
        </div>
        <span className="navbar-text small text-truncate mt-1 w-50 text-right order-1 order-md-last">
            <Link to="/login" className="nav-link custom-login">Login or Sign Up</Link>
        </span>
    </nav>
    </>
);

export default NavBar;