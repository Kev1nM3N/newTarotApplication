import KDLogo from '../assets/KD-left-transparent-png.png'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import AccountPage from './AccountPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from "./Modal";
import Backdrop from "./Backdrop";

function Nav({
   toggleModal, 
   user,
   openDialog, 
   openRegisterDialog, 
   signOut, 
   auth, 
   setUser 
  }) {
  const location = useLocation();

  function signOutUser() {
    signOut(auth)
    setUser({});
  }

  function openMenu (){
    document.body.classList += (` menu__open`)
}

  return (
    <nav data-aos="fade-down">
      <div className="left-side">
        <figure>
          <img
            className="headerLogo"
            src={KDLogo}
            alt=""
          />
        </figure>
      </div>
      <div className="right-side">
        <ul className="AboutInfo">
          {location.pathname !== "/" && (
            <Link to="/">
              <li className="link__hover-effect">Home</li>
            </Link>
          )}
          <Link to={null}>
            <li onClick={toggleModal} className="link__hover-effect">Contact</li>
          </Link>
          <Link to="/main">
            <li className="link__hover-effect">Browse Cards</li>
          </Link>
          <Link to={user.email ? "/account" : null}>
            {user.email ? (<li>{user.email}</li> ) : (
              <li className='link__hover-effect' onClick={openDialog}>Login</li> )
            }
          </Link>
            { !user.email ? (<button onClick={openRegisterDialog} className="registerButton">Register</button>) :
              (<button className='registerButton' onClick={signOutUser}>Sign Out</button>) }
        </ul>

        <Link className="btn__menu--link" to={null}>
          <FontAwesomeIcon 
            onClick={openMenu}
            icon={faBars}
            alt="hamburgerMenu"
            className="btn__menu"
            style={{fontSize: "20px"}}
          />
        </Link>

        <Backdrop openMenu={openMenu} toggleModal={toggleModal}
         openDialog={openDialog} openRegisterDialog={openRegisterDialog}
         user={user} signOutUser={signOutUser}/>
      </div>

      <Modal toggleModal={toggleModal}/>
    </nav>
  );
}

AOS.init();

export default Nav;