import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { auth } from './firebase/init.js'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from "firebase/auth";
import cardImageMapping from "./cardImageMapping.js";
import Home from "./components/Home";
import Card from "./components/Card";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Footer from "./components/Footer.jsx";
import UndrawLogin from "./components/UndrawLogin.jsx";
import UndrawRegister from "./components/UndrawRegister.jsx";
import AccountPage from "./components/AccountPage.jsx";

function App() {
  let [modalOpen, setModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [user, setUser] = useState({});

  function toggleModal (){
    if (modalOpen){
        setModalOpen(false)
        return document.body.classList.remove(`modal--open`);
    }
    setModalOpen(true)
    document.body.classList += ` modal--open`;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const openRegisterDialog = () => setIsRegisterDialogOpen(true);
  const closeRegisterDialog = () => setIsRegisterDialogOpen(false);

  return (
    <Router>
      <section>
        <Nav toggleModal={toggleModal} user={user} openDialog={openDialog} openRegisterDialog={openRegisterDialog} signOut={signOut}
          auth={auth} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:id" element={<Card cardImageMapping={cardImageMapping} scrollToTop={scrollToTop}/>}/>
          <Route path="/search/:query" element={<Main toggleModal={toggleModal} scrollToTop={scrollToTop}
           cardImageMapping={cardImageMapping}/>} />
          <Route path="/main" element={<Main toggleModal={toggleModal}
           scrollToTop={scrollToTop} cardImageMapping={cardImageMapping}/>}/>
          <Route path="/account" element={<AccountPage auth={auth}  />}/>
        </Routes>
        <Footer toggleModal={toggleModal} scrollToTop={scrollToTop}/>
        <UndrawLogin isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} closeDialog={closeDialog} auth={auth}
         signInWithEmailAndPassword={signInWithEmailAndPassword} user={user} setUser={setUser} onAuthStateChanged={onAuthStateChanged}/>
        <UndrawRegister isRegisterDialogOpen={isRegisterDialogOpen} setUser={setUser} 
         closeRegisterDialog={closeRegisterDialog} auth={auth} createUserWithEmailAndPassword={createUserWithEmailAndPassword}
          setIsRegisterDialogOpen={setIsRegisterDialogOpen} onAuthStateChanged={onAuthStateChanged}/>
      </section>
    </Router>
  );
}

export default App;