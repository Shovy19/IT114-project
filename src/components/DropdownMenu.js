import React, { useState } from 'react';
import './DropdownMenu.css'; // Import the CSS file.
import { Link, useLocation } from 'react-router-dom';



const DropdownMenu = () => {

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const username = params.get('username');

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="custom-button" // Add a class for the button
        onClick={toggleDropdown}
      >
        Caraga State University <br></br> Information Menu
      </button>
      <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
        <ul>
          <Link to={`/Homepage/Map?username=${username}`}>
          <li>
            <button className="custom-dropdown-item">MAP</button>
          </li>
          </Link>
          <Link to={`/Homepage/Building?username=${username}`}>
          <li>
            <button className="custom-dropdown-item">BUILDING</button>
          </li>
          </Link>
          <Link to="/Homepage/Colleges">
          <li>
            <button className="custom-dropdown-item">COLLEGES</button>
          </li>
          </Link>
          <Link to="/Homepage/Instructor">
          <li>
            <button className="custom-dropdown-item">INSTRUCTOR</button>
          </li>
          </Link>
          <Link to={`/Homepage/Event?username=${username}`}>
          <li>
            <button className="custom-dropdown-item">EVENTS</button>
          </li>
          </Link>
          <li>
            <button className="custom-dropdown-item">Others</button>
          </li>
        </ul>
        <div className="back custom-dropdown-item" onClick={toggleDropdown}>
          ^
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
