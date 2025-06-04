import { useEffect, useState } from "react";

export default function Board({ getScore, getBestScore }) {
  const [cards, setCards] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
        const data = await res.json();

        const detailsList = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const detail = await res.json();
            return {
              name: detail.name,
              image: detail.sprites.front_default,
            };
          })
        );

        setCards(detailsList);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }

    fetchPokemon();
  }, []);

  const shuffledCards = [...cards].sort(() => 0.5 - Math.random());

  const calculateScore = (card) => {
    const hasClicked = history.some((item) => item.name === card.name);

    if (hasClicked) {
      getBestScore();
      setHistory([]);
    } else {
      getScore();
      setHistory((prev) => [...prev, card]);
    }
  };

  return (
    <div className="board">
      {shuffledCards.map((card) => (
        <div
          onClick={() => calculateScore(card)}
          className="card"
          key={card.name}
        >
          <img src={card.image} alt={card.name} />
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
}