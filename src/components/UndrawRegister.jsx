import React from "react";
import undrawWelcome from "../assets/undraw_welcoming.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function UndrawRegister({
  isRegisterDialogOpen,
  setUser,
  closeRegisterDialog,
  auth,
  createUserWithEmailAndPassword,
  setIsRegisterDialogOpen,
  onAuthStateChanged
}) {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function registerUser() {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user2 = userCredential.user;
      console.log(user2);
      setUser(user2)
      closeRegisterDialog();
      alert(`Thank you for signing up ${user2.email}! We hope you enjoy our application.`)
    })
    .catch((error) => {
      console.log(error);
      alert('It appears the login information you entered is already being used. Please sign in instead.')
    });
    setIsRegisterDialogOpen(false)
    setLoading(false);
  }

  function loadingState(event) {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      registerUser();
    }, 2000);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser){
        setUser(loggedInUser)
      }
    })
  }, [])

  return (
    <dialog open={isRegisterDialogOpen} style={{ backgroundColor: "var(--Dusty-White)" }}>
      <FontAwesomeIcon
        className="fas fa-times modal__exit click"
        style={{ cursor: "pointer", color: "black" }}
        icon={faXmark}
        onClick={closeRegisterDialog}
      />

      {!loading ? (
        <div className="box">
          <div className="container">
            <div className="row">
              <div className="topBox">
                <div className="topBox__container">
                  <figure
                    style={{ width: "50%" }}
                    className="undrawSignUp__container"
                  >
                    <img
                      src={undrawWelcome}
                      className="undrawSignUp__img"
                      alt=""
                    />
                  </figure>
                </div>
                <h2>Welcome new user!</h2>
                <p>Enter your details and you'll have an account in no time!</p>
              </div>

              <div className="bottomBox">
                <form action="">
                  <div className="form__item">
                    <label className="form__item--label">Email:</label>
                    <input
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      name="user_email"
                      className="input"
                    ></input>
                  </div>
                  <div className="form__item">
                    <label className="form__item--label">Password:</label>
                    <input
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      name="user_email"
                      className="input"
                    ></input>
                  </div>
                  <button
                    onClick={(e) => loadingState(e)}
                    className="registerButton"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading__background">
          <FontAwesomeIcon icon="fa-solid fa-spinner" />
        </div>
      )}
    </dialog>
  );
}

export default UndrawRegister;