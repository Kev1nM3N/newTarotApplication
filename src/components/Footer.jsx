import React from 'react'
import profilePic from '../assets/Kevin AI.jpeg'
import KDLogo from '../assets/KD-left-transparent-png.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

function Footer({toggleModal, scrollToTop}) {
    const handleContactClick = () => {
        scrollToTop();
        toggleModal();
    };

  return (
    <footer>
        <div className="container">
            <div className="row footer__row">
                <Link to={null} onClick={scrollToTop} className="footer__anchor">
                    <figure className="footer__logo--wrapper">
                        <img className="footer__logo--img" src={KDLogo} alt=""/>
                    </figure>
                    <span className="top">
                        <FontAwesomeIcon icon={faArrowUp} className='upArrow' alt="uparrow"/>
                    </span>
                </Link>
                <div className="footer__social--list">
                    <Link to="/" onClick={scrollToTop} className="
                    footer__social--link
                    link__hover-effect
                    ">
                        Home
                    </Link>
                    <Link to={null} onClick={handleContactClick} className="
                    footer__social--link
                    link__hover-effect
                    ">
                        Contact
                    </Link>
                    <Link to={null} style={{cursor: "no-drop"}} className="
                    footer__social--link
                    link__hover-effect
                    ">
                        LinkedIn
                    </Link>
                    <Link to="https://github.com/Kev1nM3N" target='_blank' className="
                    footer__social--link
                    link__hover-effect
                    ">
                        GitHub
                    </Link>
                </div>
                <div className="footer__copyright">Copyright &#169; 2023 KD Design</div>
                <figure style={{marginTop: "16px"}}>
                    <img id="personal-img" src={profilePic} alt="" />
                </figure>
            </div>
        </div>
    </footer>
  )
}

export default Footer