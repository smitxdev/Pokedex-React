// Main Component - PokemonDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

// Import our new components
import PokemonHeader from '../components/PokemonHeader';
import PokemonStyles from '../components/PokemonStyles';
import PokemonImageCard from '../components/PokemonImageCard';
import PokemonDetailTabs from '../components/PokemonDetailTabs';
import PokemonSprites from '../components/PokemonSprites';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPokemonData = async () => {
      try {
        // Fetch basic Pokemon data
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(pokemonResponse.data);
        
        // Fetch species data (for description)
        const speciesResponse = await axios.get(pokemonResponse.data.species.url);
        setSpecies(speciesResponse.data);
        
        // Fetch evolution chain
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
        setEvolutionChain(evolutionResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name]);
  
  if (loading) {
    return (
      <div className="text-center py-5 animate__animated animate__pulse animate__infinite">
        <Spinner animation="border" variant="primary" className="mb-3" style={{ width: '3rem', height: '3rem' }} />
        <h4 className="mt-3">Loading {name.charAt(0).toUpperCase() + name.slice(1)}'s data...</h4>
      </div>
    );
  }

  return (
    <div className="pokemon-detail-page bg-light min-vh-100 pb-5">
      <PokemonHeader pokemon={pokemon} />
      
      <Container className="animate__animated animate__fadeIn">
        <div className="row">
          <div className="col-lg-5 mb-4">
            <PokemonImageCard pokemon={pokemon} species={species} />
          </div>
          
          <div className="col-lg-7 mb-4">
            <PokemonDetailTabs pokemon={pokemon} />
          </div>
        </div>
        
        <PokemonSprites pokemon={pokemon} />
        
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary px-4 py-2">
            Back to Pokédex
          </Link>
        </div>
      </Container>
      
      <PokemonStyles />
    </div>
  );
}

export default PokemonDetail;