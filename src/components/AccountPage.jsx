import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

function AccountPage({ auth }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setError("No user is currently logged in.");
      return;
    }

    if (!password) {
      setError("Please enter your password to continue.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await user.delete();
      setSuccess("Your account has been successfully deleted. Taking you to the home page...");
      setError("");
       setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 4000);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("The password you entered is incorrect. Please try again.");
      } else {
        setError("An error occurred while deleting your account. Please try again later.");
      }
      setSuccess("");
    }
  };

  return (
    <div id="accountPage">
      <div className="container">
        <div className="row accountRow">
          <h1>Welcome to your account details</h1>
          <p style={{maxWidth: '400px', margin: 'auto'}}>
            <i>Please note:</i> this application is a demo and there is only the
            option to delete your account. To delete your account, type in your password
            and press delete. You will then be redirected to the home page.
          </p>
          {success && <h1 style={{ color: "green" }}>{success}</h1>}
          {error && <h1 style={{ color: "red" }}>{error}</h1>}

          <div className="accountDetailsBox">
            <div className="bottomBox">
              <form onSubmit={handleDeleteAccount}>
                <label className="form__item--label">Password:</label>
                <div className="form__item">
                  <input
                    type="password"
                    name="user_password"
                    className="input accountInput"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <h2>Click the button below to delete your account</h2>
                <button type="submit" className="registerButton">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
