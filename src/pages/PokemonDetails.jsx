import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Badge, ProgressBar, Button, Tab, Nav } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');

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

  // Get type color based on Pokémon type
  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };
    return typeColors[type] || '#777';
  };

  // Get English flavor text
  const getEnglishFlavorText = () => {
    if (!species) return "No description available";
    
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === "en"
    );
    
    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : "No description available";
  };

  // Format Pokemon ID
  const formatPokemonId = (id) => {
    return `#${String(id).padStart(3, '0')}`;
  };

  // Get stat color based on value
  const getStatColor = (value) => {
    if (value < 50) return 'danger';
    if (value < 80) return 'warning';
    if (value < 100) return 'info';
    return 'success';
  };

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
      {/* Header with background gradient based on type */}
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
      
      <Container className="animate__animated animate__fadeIn">
        <Row>
          {/* Image Column */}
          <Col lg={5} className="mb-4">
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
                <div className="d-flex justify-content-center mb-3">
                  {pokemon.types.map((typeInfo, idx) => (
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
                
                <div className="pokemon-properties">
                  <Row className="text-center g-3">
                    <Col xs={4}>
                      <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="p-2">
                          <div className="text-muted small">Height</div>
                          <div className="fw-bold">{pokemon.height / 10} m</div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={4}>
                      <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="p-2">
                          <div className="text-muted small">Weight</div>
                          <div className="fw-bold">{pokemon.weight / 10} kg</div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={4}>
                      <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="p-2">
                          <div className="text-muted small">Base XP</div>
                          <div className="fw-bold">{pokemon.base_experience}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
                
                {species && (
                  <Card className="border-0 bg-light mt-3">
                    <Card.Body>
                      <p className="mb-0">{getEnglishFlavorText()}</p>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          {/* Details Column */}
          <Col lg={7} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-bottom-0 pt-3">
                <Nav variant="tabs" className="nav-fill">
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'stats'} 
                      onClick={() => setActiveTab('stats')}
                      className="fw-medium"
                    >
                      Base Stats
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'abilities'} 
                      onClick={() => setActiveTab('abilities')}
                      className="fw-medium"
                    >
                      Abilities
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'moves'} 
                      onClick={() => setActiveTab('moves')}
                      className="fw-medium"
                    >
                      Moves
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              
              <Card.Body className="px-4">
                <Tab.Content>
                  <Tab.Pane active={activeTab === 'stats'}>
                    <h4 className="mb-3 border-bottom pb-2">Base Stats</h4>
                    {pokemon.stats.map((stat) => {
                      const statName = stat.stat.name.replace('-', ' ');
                      const statValue = stat.base_stat;
                      
                      return (
                        <div key={stat.stat.name} className="mb-3 animate__animated animate__fadeInRight">
                          <div className="d-flex justify-content-between">
                            <strong className="text-capitalize">{statName}</strong>
                            <span>{statValue}</span>
                          </div>
                          <ProgressBar 
                            now={statValue} 
                            max={200}
                            variant={getStatColor(statValue)}
                            style={{ height: '10px' }}
                            className="mt-1 animate__animated animate__fadeInLeft"
                          />
                        </div>
                      );
                    })}
                    
                    <div className="mt-4">
                      <h6>Total: 
                        <span className="fw-bold ms-2">
                          {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                        </span>
                      </h6>
                    </div>
                  </Tab.Pane>
                  
                  <Tab.Pane active={activeTab === 'abilities'}>
                    <h4 className="mb-3 border-bottom pb-2">Abilities</h4>
                    <Row xs={1} md={2} className="g-3">
                      {pokemon.abilities.map((ability) => (
                        <Col key={ability.ability.name}>
                          <Card className="h-100 shadow-sm border-0 animate__animated animate__fadeIn">
                            <Card.Body>
                              <h5 className="text-capitalize">
                                {ability.ability.name.replace('-', ' ')}
                                {ability.is_hidden && (
                                  <Badge bg="secondary" className="ms-2 small">Hidden</Badge>
                                )}
                              </h5>
                              <Card.Text className="text-muted small">
                                Slot: {ability.slot}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Tab.Pane>
                  
                  <Tab.Pane active={activeTab === 'moves'}>
                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                      <h4 className="mb-0">Moves</h4>
                      <small className="text-muted">Showing first 20 of {pokemon.moves.length}</small>
                    </div>
                    <Row xs={1} md={2} className="g-2">
                      {pokemon.moves.slice(0, 20).map((move, index) => (
                        <Col key={move.move.name}>
                          <Card 
                            className="move-card mb-2 shadow-sm border-0 animate__animated animate__fadeIn"
                            style={{animationDelay: `${index * 0.05}s`}}
                          >
                            <Card.Body className="py-2 px-3">
                              <Card.Title className="text-capitalize mb-0 fs-6">
                                {move.move.name.replace('-', ' ')}
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Sprites Section */}
        <Card className="border-0 shadow-sm mt-3 mb-4 animate__animated animate__fadeIn">
          <Card.Header className="bg-white border-bottom-0">
            <h4 className="mb-0">Sprites</h4>
          </Card.Header>
          <Card.Body>
            <Row className="text-center g-4">
              {pokemon.sprites.front_default && (
                <Col xs={6} sm={3}>
                  <div className="sprite-container">
                    <img 
                      src={pokemon.sprites.front_default} 
                      alt="Front Default" 
                      className="img-fluid sprite-image animate__animated animate__pulse animate__infinite animate__slow"
                      style={{
                        imageRendering: 'pixelated',
                        width: '96px',
                        height: '96px'
                      }}
                    />
                    <div className="text-muted small mt-2">Front Default</div>
                  </div>
                </Col>
              )}
              {pokemon.sprites.back_default && (
                <Col xs={6} sm={3}>
                  <div className="sprite-container">
                    <img 
                      src={pokemon.sprites.back_default} 
                      alt="Back Default" 
                      className="img-fluid sprite-image animate__animated animate__pulse animate__infinite animate__slow"
                      style={{
                        imageRendering: 'pixelated',
                        width: '96px',
                        height: '96px',
                        animationDelay: '0.2s'
                      }}
                    />
                    <div className="text-muted small mt-2">Back Default</div>
                  </div>
                </Col>
              )}
              {pokemon.sprites.front_shiny && (
                <Col xs={6} sm={3}>
                  <div className="sprite-container">
                    <img 
                      src={pokemon.sprites.front_shiny} 
                      alt="Front Shiny" 
                      className="img-fluid sprite-image animate__animated animate__pulse animate__infinite animate__slow"
                      style={{
                        imageRendering: 'pixelated',
                        width: '96px',
                        height: '96px',
                        animationDelay: '0.4s'
                      }}
                    />
                    <div className="text-muted small mt-2">Front Shiny</div>
                  </div>
                </Col>
              )}
              {pokemon.sprites.back_shiny && (
                <Col xs={6} sm={3}>
                  <div className="sprite-container">
                    <img 
                      src={pokemon.sprites.back_shiny} 
                      alt="Back Shiny" 
                      className="img-fluid sprite-image animate__animated animate__pulse animate__infinite animate__slow"
                      style={{
                        imageRendering: 'pixelated',
                        width: '96px',
                        height: '96px',
                        animationDelay: '0.6s'
                      }}
                    />
                    <div className="text-muted small mt-2">Back Shiny</div>
                  </div>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
        
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary px-4 py-2">
            Back to Pokédex
          </Link>
        </div>
      </Container>
      
      {/* CSS for animations and hover effects */}
      <style jsx>{`
        .pokemon-main-image {
          filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2));
        }
        
        .sprite-container {
          transition: transform 0.3s;
        }
        
        .sprite-container:hover {
          transform: scale(1.1);
        }
        
        .pokemon-image-card {
          border-radius: 20px;
          overflow: hidden;
        }
        
        .move-card {
          transition: transform 0.2s;
          border-radius: 10px;
        }
        
        .move-card:hover {
          transform: translateX(5px);
          background-color: #f8f9fa;
        }
        
        .nav-tabs .nav-link {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          color: #495057;
        }
        
        .nav-tabs .nav-link.active {
          font-weight: bold;
          color: #0d6efd;
        }
      `}</style>
    </div>
  );
}

export default PokemonDetail;