import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Shield_of_the_University_of_Wollongong.svg/195px-Shield_of_the_University_of_Wollongong.svg.png" width="38" />
          UOW Room Booking System
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/calendar">Booking</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/rooms">Rooms</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Log In</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}