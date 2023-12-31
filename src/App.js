// import React, {useState, useEffect} from "react";
// import './App.css';

// const PokemonCard = ({ name, url }) => {
//   const [pokemonData, setPokemonData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setPokemonData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [url]);

//     return (
//     <div className="card">
//       {pokemonData ? (
//         <>
//           <div className="title">
//             <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
//           </div>
//           <div className="data">
//             <div className="profil">
//               <img src={pokemonData.sprites.front_default} alt={name} />
//             </div>
//             <div className="infos">
//               <p>Types: {pokemonData.types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}</p>
//               <p>Height: {pokemonData.height}</p>
//               <p>Weight: {pokemonData.weight}</p>
//             </div>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 8;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1273');
//         const data = await response.json();
//         setPokemonData(data.results);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//     // const LEFT_PAGE = 'LEFT';
//     // const RIGHT_PAGE = 'RIGHT';
//     // const range = (from, to, step = 1) => {
//     //   let i = from;
//     //   const range = [];

//     //   while (i <= to) {
//     //     range.push(i);
//     //     i += step;
//     //   }

//     //   return range;
//     // }


//     // Calculer le nombre total de pages
//     const totalPages = Math.ceil(pokemonData.length / cardsPerPage);

//     // Fonction pour changer de page
//     const handlePageChange = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };

//     // Générer les numéros de page pour la pagination
//     const renderPageNumbers = () => {
//       const pageNumbers = [];
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }

//       // Pour limiter le nombre de numéros de page affichés, vous pouvez adapter cette partie selon vos préférences.
//       const visiblePageNumbers = pageNumbers.filter(
//         (pageNumber) =>
//           pageNumber === currentPage ||
//           (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
//       );

//       return visiblePageNumbers.map((pageNumber) => (
//         <button
//           key={pageNumber}
//           onClick={() => handlePageChange(pageNumber)}
//           className={currentPage === pageNumber ? 'active' : ''}
//         >
//           {pageNumber}
//         </button>
//       ));
//     };

//     // Calculer l'index de début et de fin des cartes à afficher
//     const indexOfLastCard = currentPage * cardsPerPage;
//     const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//     const currentPokemonData = pokemonData.slice(indexOfFirstCard, indexOfLastCard);
//   return (
//     <div>
//       <div className="cards">
//         {currentPokemonData.map((pokemon, index) => (
//           <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
//         ))}
//       </div>
//       <div className="pages">
//       {currentPage >= 1 && (
//           <>
//             <button onClick={() => handlePageChange(1)}>&laquo;</button>
//             <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
//           </>
//         )}
//         {renderPageNumbers()}
//         {currentPage <= totalPages && (
//           <>
//             <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
//             <button onClick={() => handlePageChange(totalPages)}>&raquo;</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import './App.css';
import PokemonCard from "./Component"; // Import du composant PokemonCard
import Pagination from "./Pagination"; // Import du composant Pagination

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const pageNeighbours = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1273');
        const data = await response.json();
        setPokemonData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPokemonData = pokemonData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(pokemonData.length / cardsPerPage);

  return (
    <div>
      <div className="cards">
        {currentPokemonData.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNeighbours={pageNeighbours}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
