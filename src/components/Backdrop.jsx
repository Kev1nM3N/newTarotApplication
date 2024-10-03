import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Backdrop({ toggleModal, openDialog, openRegisterDialog, user, signOutUser }) {
  function closeMenu (){
    document.body.classList.remove(`menu__open`)
  }

  //we need to fix a few bugs when it's closing from hamburger menu

  return (
    <div className="menu__backdrop">
      <FontAwesomeIcon
        icon={faXmark}
        className="btn__menu btn__menu--close click"
        onClick={closeMenu}
        style={{ cursor: "pointer", fontSize: "25px" }}
      />
      <ul className="menu__links">
        <li>
          <Link to="/" onClick={closeMenu} className="nav__link">
            Home
          </Link>
        </li>
        <li>
          <Link to={null} onClick={toggleModal} className="nav__link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/main" onClick={closeMenu} className="nav__link">
            Browse Cards
          </Link>
        </li>
        <li>
          <Link to={null} style={{cursor: 'no-drop'}} className="nav__link">
            LinkedIn
          </Link>
        </li>
        <li>
          <Link to="https://github.com/Kev1nM3N" target="_blank" onClick={closeMenu} className="nav__link">
            GitHub
          </Link>
        </li>
        <li>
          {user.email ? (<Link to={null} className="nav__link">{user.email}</Link> ) : (
            <Link className='nav__link' onClick={openDialog}>Login</Link> )
          }
        </li>
        <li>
          { !user.email ? (
            <Link to={null} className="nav__link">
              <button onClick={openRegisterDialog} className="registerButton">Register</button>
            </Link>
          ) :  (
            <Link to={null} className="nav__link">
              <button className='registerButton' onClick={signOutUser}>Sign Out</button>
            </Link>
          ) }
        </li>
      </ul>
    </div>
  );
}

export default Backdrop;