// components/PokemonHeader.jsx
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getTypeColor, formatPokemonId } from '../utils/pokemonUtils';

function PokemonHeader({ pokemon }) {
  return (
    <div 
      className="pokemon-header py-4 mb-4 animate__animated animate__fadeIn"
      style={{ 
        background: pokemon.types.length > 1 
          ? `linear-gradient(135deg, ${getTypeColor(pokemon.types[0].type.name)} 0%, ${getTypeColor(pokemon.types[1].type.name)} 100%)`
          : getTypeColor(pokemon.types[0].type.name),
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" className="btn btn-light rounded-circle me-2">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <h1 className="text-white mb-0 fw-bold text-capitalize">
          {pokemon.name}
        </h1>
        <div className="id-badge">
          <h3 className="text-white mb-0 fw-bold">
            {formatPokemonId(pokemon.id)}
          </h3>
        </div>
      </Container>
    </div>
  );
}

export default PokemonHeader;