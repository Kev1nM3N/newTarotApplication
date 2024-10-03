import React from "react";
import undrawSignUp from "../assets/undraw_signup.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function UndrawLogin({
  isDialogOpen,
  setIsDialogOpen,
  closeDialog,
  auth,
  signInWithEmailAndPassword,
  user,
  setUser,
  onAuthStateChanged
}) {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function signInUser() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user1 = userCredential.user;
      console.log(user1);
      setUser(user1);
      alert(`Welcome back ${user1.email}!`)
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(error);
    });
    setIsDialogOpen(false);
    setLoading(false)
  }

  function loadingState(event) {
    event.preventDefault();
    setLoading(true)
    setTimeout(() => {
      signInUser();
    }, 2000);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser){
        setUser(loggedInUser) //I guess it was never suppose to be user variable
      }
    })
  }, [])

  return (
    <dialog open={isDialogOpen} style={{ backgroundColor: "var(--cosmic-latte)" }}>
      <FontAwesomeIcon
        className="fas fa-times modal__exit click"
        style={{ cursor: "pointer", color: "black" }}
        icon={faXmark}
        onClick={closeDialog}
      />

      { !loading ? 
      (
        <div className="box">
          <div className="container">
            <div className="row">
              <div className="topBox">
                <div className="topBox__container">
                  <figure className="undrawSignUp__container">
                    <img
                      src={undrawSignUp}
                      className="undrawSignUp__img"
                      alt=""
                    />
                  </figure>
                </div>
                <h2>Welcome Back!</h2>
                <p>Enter your login details and you'll be all set!</p>
                {user.email}
              </div>

              <div className="bottomBox">
                <form action="">
                  <div className="form__item">
                    <label className="form__item--label">Email:</label>
                    <input
                      type="email"
                      name="user_email"
                      className="input"
                      onChange={(event) => setEmail(event.target.value)}
                    ></input>
                  </div>
                  <div className="form__item">
                    <label className="form__item--label">Password:</label>
                    <input
                      type="password"
                      name="user_email"
                      className="input"
                      onChange={(event) => setPassword(event.target.value)}
                    ></input>
                  </div>
                  <button onClick={(e) => loadingState(e)} className="registerButton">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : 
      (
        <div className="loading__background">
          <FontAwesomeIcon icon="fa-solid fa-spinner" />
        </div>
      )}
    </dialog>
  );
}

export default UndrawLogin;
