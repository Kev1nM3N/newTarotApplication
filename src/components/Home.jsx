import React from 'react'
import crystalBall from '../assets/tarot with crystal ball display.png'
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchBar = document.querySelector(".searchbar");
    const searchBarValue = searchBar.value;
    navigate(`/search/${searchBarValue}`);
  };

  return (
    <header>
        <div data-aos="fade-left" className="header__left-side">
                <h1>Become familiar with the Tarot Cards!</h1>
                <p>An exciting understanding of yourself awaits! Tarot is the most popular divinity tool that can
                    forecast and offer interpretations in love, career and finance whereas yes/no tarot is
                     useful for answering users' questions in a fascinating way.
                </p>
                
                <div className="searchBox">
                    <input onKeyDown={(event) => {
                        if (event.key === "Enter"){
                          handleSearch();
                        }
                    }} className="searchbar" type="search" placeholder="Search a Card"/>
                    <button onClick={handleSearch} className="searchbarButton">Find</button>
                </div>
            </div>

            <div data-aos="fade-right" className="header__right-side">
                <figure>
                    <img src={crystalBall} alt=""/>
                </figure>
            </div>
    </header>
  )
}

AOS.init();

export default Home