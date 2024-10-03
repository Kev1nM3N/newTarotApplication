import React, { useState, useEffect } from "react";
import tarotBackDesign from "../assets/Tarot back design.jpg";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Card({ cardImageMapping, scrollToTop }) {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const { id } = useParams();
  const parsedOrder = parseInt(id);

  async function fetchAllCards (){
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

    setFilteredCards([...mergedCards]);
    setCards(mergedCards);
  }

  useEffect(() => {
    setTimeout(() => {
      let loadingBackground = document.querySelector(".loading__background")
      let cardsMain = document.getElementById("cards__main")
      fetchAllCards();
      if (loadingBackground){
        loadingBackground.remove();
        cardsMain.style.opacity = '1';
      }
    }, 2000);
  }, []);

  const selectedCard = filteredCards.find((card) => card.numberedOrder === parsedOrder);

  let fiveRecommendedCards = [];

  if (cards.length > 0) {
    let tempCards = [...cards]; // Create a copy to avoid modifying the original
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * tempCards.length);
      fiveRecommendedCards.push(tempCards[randomIndex]);
      tempCards.splice(randomIndex, 1); // Remove the selected card to avoid duplicates
    }
  }

  return (
    <div id="cardPage">
      <div className="loading__background">
        <FontAwesomeIcon icon="fa-solid fa-spinner" />
      </div>
      <div id="cards__main">
        <div className="cards__container">
          <div className="row">
            <div className="card__selected--top">
              <Link to="/main" className="card__link">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h2 className="card__selected--title--top">Back</h2>
              <h1 className="aboutTitle">About</h1>
            </div>
            <div className="card__selected">
              {selectedCard ? (
                <div className="card__selected--container">
                  <div className="card__selected--leftBox">
                    <figure className="card__selected--figure">
                      <img src={selectedCard.image} alt="" className="card__selected--img" />
                    </figure>
                  </div>
                  <div className="card__selected--rightBox">
                    <div className="card__selected--description">
                      <h2 className="card__selected--title">{selectedCard.name}</h2>
                      <div className="card__summary">
                        <h3 className="card__summary--title">Summary</h3>
                        <p className="card__summary--para">
                          <em>Meaning Upright:</em> {selectedCard.meaning_up}
                        </p>
                        <p className="card__summary--para">
                          <em>Meaning Reversed:</em> {selectedCard.meaning_rev}
                        </p>
                        <p className="card__summary--para">
                          <em>Arcana: </em>{" "}
                          {selectedCard.type
                            ? selectedCard.type.toUpperCase()
                            : "Unknown"}
                          <br />
                          <em>Suit: </em>{" "}
                          {selectedCard.suit
                            ? selectedCard.suit.toUpperCase()
                            : "None"}
                          <br />
                          <em>Category: </em>{" "}
                          {selectedCard.category
                            ? selectedCard.category.toUpperCase()
                            : "None"}
                        </p>
                        <p className="card__summary--para">
                          <em>Description:</em> {selectedCard.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Card not found</p>
              )}
            </div>
          </div>
        </div>

        <div className="cards__container">
          <div className="row">
            <div className="card__selected--top">
              <h2 className="card__selected--title--top"><i>Recommended Cards</i></h2>
            </div>
            <div className="cards">
              {fiveRecommendedCards.map((card, index) => (
                card.numberedOrder !== selectedCard.numberedOrder && 
                <div key={index} className="cardRec">
                  <Link onClick={scrollToTop} to={`/${card.numberedOrder}`}>
                    <figure className="card__container">
                      <img src={tarotBackDesign} alt="" className="tarot__frontimg"/>
                      <img src={card.image} className="tarot__backimg" alt={card.name} />
                    </figure>
                  </Link>
                  <p className="card__name">{card.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;