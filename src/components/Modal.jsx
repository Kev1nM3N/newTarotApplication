import React, { useRef } from "react";
import profilePic from '../assets/Kevin AI.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { sendEmail } from "../emailJS.js";

function Modal({ toggleModal }) {
  const form = useRef();
  
  return (
    <div className="modal">
      <div className="modal__half modal__about">
        <figure style={{display: "flex", alignItems: "center"}}>
            <h3 className="modal__title modal__title--about">Kevin Mendez</h3>
            <img id="personal-img" style={{marginLeft: "16px"}} src={profilePic} alt="" />
        </figure>
        <h4 className="modal__sub-title modal__sub-title--about">
          Frontend Software Engineer 👨‍💻
        </h4>
        <p className="modal__para">
          I'm a 28 year-old American{" "}
          <span className="red red__default">Software Engineer</span> with a
          strong passion for developing websites with great{" "}
          <span className="red red__default">user experiences.</span>
          <br />I currently work on extremely difficult engineering problems and
          learn from a team consisting of some of the most
          <span className="red red__default"> talented</span> and{" "}
          <span className="red red__default">experienced</span> software
          engineers everyday.
        </p>
        <div className="modal__languages">
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="https://icons.veryicon.com/png/o/application/skills-section/html5-12.png"
              alt=""
            />
            <span className="language__name">HTML</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="https://cdn.iconscout.com/icon/free/png-256/css3-9-1175237.png"
              alt=""
            />
            <span className="language__name">CSS</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="https://ik.imagekit.io/garbagevalue/garbage/tags/JavaScript_ugn5DK93-.png"
              alt=""
            />
            <span className="language__name">JavaScript</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="https://www.svgrepo.com/show/452092/react.svg"
              alt=""
            />
            <span className="language__name">React</span>
          </figure>
        </div>
      </div>
      <div className="modal__half modal__contact">
        <FontAwesomeIcon
          className="fas fa-times modal__exit click"
          style={{ cursor: "pointer" }}
          icon={faXmark}
          onClick={toggleModal}
        />
        <h3 className="modal__title modal__title--contact">Let's Chat! 👨🏻‍💼</h3>
        <h4 className="modal__sub-title modal__sub-title--contact">
          I'm Currently Open To New Opportunities
        </h4>
        <form ref={form} onSubmit={(e) => sendEmail(e, form)} id="contact__form">
          <div className="form__item">
            <label className="form__item--label">Name</label>
            <input type="text" name="user_name" className="input"></input>
          </div>
          <div className="form__item">
            <label className="form__item--label">Email</label>
            <input type="email" name="user_email" className="input"></input>
          </div>
          <div className="form__item">
            <label className="form__item--label">Message</label>
            <textarea
              style={{ height: "130px" }}
              type="text"
              name="user_message"
              className="input inputTextArea"
            ></textarea>
          </div>
          <button className="form__submit">Send</button>
        </form>
        <div className="modal__overlay modal__overlay--loading">
            <FontAwesomeIcon icon="fa-solid fa-spinner"/>
        </div>
        <div className="modal__overlay modal__overlay--success">
          Thank you! Looking forward to speaking with you soon!
        </div>
      </div>
    </div>
  );
}

export default Modal;