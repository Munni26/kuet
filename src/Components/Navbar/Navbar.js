import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/All Pic/kuet logo.jpg'
const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <img className="img-fluid" style={{height:'80px'}} src={Logo} alt="" />
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav m-auto">
            <li class="nav-item active">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/hal">Hall</NavLink>
              <NavLink className="nav-link" to="/login"> Log-In</NavLink>
            </li>
         
          </ul>
        </div>
      </nav>
            
        </div>
    );
};

export default Navbar;