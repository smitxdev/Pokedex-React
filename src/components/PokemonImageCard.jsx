// components/PokemonImageCard.jsx
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { getTypeColor, getEnglishFlavorText } from '../utils/pokemonUtils';

function PokemonImageCard({ pokemon, species }) {
  return (
    <Card className="border-0 shadow-sm overflow-hidden pokemon-image-card">
      <div 
        className="image-bg p-4 d-flex justify-content-center align-items-center"
        style={{ 
          background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.6) 100%)`,
          height: '350px'
        }}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          className="img-fluid animate__animated animate__pulse animate__infinite animate__slow pokemon-main-image"
          style={{ maxHeight: '300px' }}
        />
      </div>
      
      <Card.Body>
        <TypeBadges types={pokemon.types} />
        <PokemonProperties pokemon={pokemon} />
        
        {species && (
          <Card className="border-0 bg-light mt-3">
            <Card.Body>
              <p className="mb-0">{getEnglishFlavorText(species)}</p>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}

function TypeBadges({ types }) {
  return (
    <div className="d-flex justify-content-center mb-3">
      {types.map((typeInfo, idx) => (
        <Badge 
          key={idx}
          className="mx-1 text-white"
          style={{ 
            backgroundColor: getTypeColor(typeInfo.type.name),
            fontSize: '1rem',
            padding: '8px 16px',
            borderRadius: '16px'
          }}
        >
          {typeInfo.type.name.toUpperCase()}
        </Badge>
      ))}
    </div>
  );
}

function PokemonProperties({ pokemon }) {
  const properties = [
    { label: "Height", value: `${pokemon.height / 10} m` },
    { label: "Weight", value: `${pokemon.weight / 10} kg` },
    { label: "Base XP", value: pokemon.base_experience }
  ];

  return (
    <div className="pokemon-properties">
      <Row className="text-center g-3">
        {properties.map((prop, index) => (
          <Col xs={4} key={index}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-2">
                <div className="text-muted small">{prop.label}</div>
                <div className="fw-bold">{prop.value}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PokemonImageCard;