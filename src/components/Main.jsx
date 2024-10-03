import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import tarotBackDesign from "../assets/Tarot back design.jpg";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Main({ scrollToTop, cardImageMapping }) {
  const { query } = useParams();
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filter, setFilter] = useState(""); // State to store the filter value
  const navigate = useNavigate();
  const searchBarRef = useRef(null);

  async function fetchCards(searchTerm = '') {
    const response = await axios.get("https://tarotapi.dev/api/v1/cards");
    let allCards = response.data.cards;
    let onlyMajorCards = allCards.filter((element) => element.type === "major");

    // EDITING THE CARDS TO MY LIKING
    let storeIn = onlyMajorCards.splice(-2, 1);
    storeIn[0].value = "0";
    onlyMajorCards.unshift(storeIn[0]);
    onlyMajorCards.find((element) =>
      element.name === "Fortitude" && (element.name = "Strength")
    );
    onlyMajorCards.find((element) =>
      element.name === "The Last Judgment" && (element.name = "Judgement")
    );
    
    let newMajorCards = onlyMajorCards;

    let mergedCards = [
      ...newMajorCards,
      ...allCards.filter((card) => card.type !== "major"),
    ];
    setCards(mergedCards); //moved this here to keep the just created mergedCards
    let minorMergedCards = mergedCards.filter(
      (element) => element.type === "minor"
    );

    minorMergedCards.find((element) => {
      if (["page", "knight", "queen", "king"].includes(element.value)) {
        element.category = "court";
      }
    });

    for (let i = 0; i < mergedCards.length; i++){
      mergedCards[i].numberedOrder = i
    }


    // NOW ADDING IMAGES TO EVERY CARD

    mergedCards.forEach((card) => {
      if (card.type === "major" || card.type === "minor") {
        card.image = cardImageMapping[card.name] || null;
      }
    });

    if (searchTerm) {
      mergedCards = mergedCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCards([...mergedCards]); // Initialize filteredCards with a new copy of all modified cards
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function singleCardSearch() {
    const searchBarValue = searchBarRef.current.value;
    navigate(`/main`);
    fetchCards(searchBarValue);
  }

  useEffect(() => {
    setTimeout(() => {
      let loadingBackground = document.querySelector(".loading__background")
      fetchCards();
      if (loadingBackground){
        loadingBackground.remove();
      }
    }, 2000);
  }, []);

  // Filter cards based on the selected filter value
  useEffect(() => {
    let filtered = cards;
    if (filter === "ALL") {
      filtered = cards;
      console.log(filtered);
    } else if (filter === "MAJOR") {
      filtered = cards.filter((card) => card.type === "major");
    } else if (filter === "MINOR") {
      filtered = cards.filter((card) => card.type === "minor");
    } else if (filter === "COURT") {
      filtered = cards.filter((card) => card.category === "court");
    }
    searchBarRef.current.value = "";
    setFilteredCards(filtered);
  }, [filter]);

  useEffect(() => {
    if (query) {
      const filtered = cards.filter((card) =>
        card.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [query, cards]);


  return (
    <>
        <div className="mainSearchBox">
            <input ref={searchBarRef} onKeyDown={(event) => {
              if (event.key === 'Enter'){
                singleCardSearch()
              }
            }} className="mainSearchBar" type="search" placeholder="Search a Card"/>
            <button onClick={singleCardSearch} className="mainsearchbarButton">Find</button>
        </div>
      <main>
        <div className="main__header">
          <h2>The <strong title="This deck was created in 1909, published by Rider & Co.">Rider-Waite</strong> Smith Deck</h2>

          <select name="" id="filter" onChange={handleFilterChange}>
            <option value="">Null</option>
            <option value="ALL">All</option>
            <option value="MAJOR">Major Arcana</option>
            <option value="MINOR">Minor Arcana</option>
            <option value="COURT">Court Cards</option>
          </select>
        </div>

        <div className="loading__background">
            <FontAwesomeIcon icon="fa-solid fa-spinner" />
        </div>

        <div className="container">
          <div className="row">
            <div className="card__list">
              {filteredCards.map((card) => (
                <div key={card.name_short} className="card">
                  <Link onClick={scrollToTop} to={`/${card.numberedOrder}`}>
                    <figure className="card__img--wrapper">
                      <img
                        src={tarotBackDesign}
                        alt=""
                        className="tarot__frontimg"
                      />
                      <img src={card.image} alt="" className="tarot__backimg" />
                    </figure>
                  </Link>

                  <p className="tarot__name">{card.name}</p>
                  <p className="tarot__category">{card.type.toUpperCase()}</p>
                  <p className="tarot__number">{card.value_int}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;