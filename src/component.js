import React, {useState, useEffect} from "react";


const PokemonCard = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

    return (
    <div className="card">
      {pokemonData ? (
        <>
          <div className="title">
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
          </div>
          <div className="data">
            <div className="profil">
              <img src={pokemonData.sprites.front_default} alt={name} />
            </div>
            <div className="infos">
              <p>Types: {pokemonData.types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}</p>
              <p>Height: {pokemonData.height}</p>
              <p>Weight: {pokemonData.weight}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
