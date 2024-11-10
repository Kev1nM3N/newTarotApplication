import React from 'react'

function AccountPage() {
  return (
    <>
        <div id="accountPage">
            <div className="container">
                <div className="row accountRow">
                    <h1>Welcome to your account details</h1>
                    <p><i>Please note:</i> this application is a demo and there is only the option to delete your account.</p>
                
                    <div className="accountDetailsBox">
                        <h4>Your info:</h4>
                        <p>Email: <span>welcome@123.com</span></p>
                       
                        <h2>Click the button below to delete your account</h2>
                        <button className='registerButton'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AccountPage