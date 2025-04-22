import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Card, Spinner, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = response.data.results;
        setPokemons(pokemonList);
        
        const details = {};
        const batchSize = 10;
        
        for (let i = 0; i < pokemonList.length; i += batchSize) {
          const batch = pokemonList.slice(i, i + batchSize);
          await Promise.all(batch.map(async (pokemon, idx) => {
            try {
              const detailResponse = await axios.get(pokemon.url);
              details[pokemon.name] = {
                id: detailResponse.data.id,
                types: detailResponse.data.types,
                stats: detailResponse.data.stats,
              };
              setLoadingProgress(Math.min(99, Math.floor((i + idx + 1) / pokemonList.length * 100)));
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
            }
          }));
        }
        
        setPokemonDetails(details);
        setLoadingProgress(100);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Updated type color function with vibrant, modern colors
  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A878',   // Softer, warmer gray
      fire: '#F08030',     // Bright, fiery orange
      water: '#6890F0',    // Cool, oceanic blue
      electric: '#F8D030', // Vivid, energetic yellow
      grass: '#78C850',    // Lush, vibrant green
      ice: '#98D8D8',      // Crisp, frosty cyan
      fighting: '#C03028', // Bold, intense red
      poison: '#A040A0',   // Rich, toxic purple
      ground: '#E0C068',   // Earthy, golden brown
      flying: '#A890F0',   // Light, airy lavender
      psychic: '#F85888',  // Vibrant, mystical pink
      bug: '#A8B820',      // Fresh, leafy green
      rock: '#B8A038',     // Solid, stony gold
      ghost: '#705898',    // Eerie, shadowy purple
      dragon: '#7038F8',   // Majestic, royal purple
      dark: '#705848',     // Deep, mysterious brown
      steel: '#B8B8D0',    // Sleek, metallic silver
      fairy: '#EE99AC',    // Soft, enchanting pink
    };
    return typeColors[type] || '#777';
  };

  // Function to get gradient based on Pokémon types
  const getCardGradient = (types) => {
    if (!types || types.length === 0) return 'linear-gradient(to bottom, #e6e6e6, #ffffff)';
    const primaryType = types[0].type.name;
    const secondaryType = types[1]?.type.name;
    const primaryColor = getTypeColor(primaryType);
    const secondaryColor = secondaryType ? getTypeColor(secondaryType) : '#ffffff';
    return `linear-gradient(135deg, ${primaryColor}40 0%, ${secondaryColor}20 100%)`;
  };

  return (
    <div className="pokemon-app min-vh-100" style={{ backgroundColor: '#F5F7FA' }}>
      <div 
        className="bg-gradient text-white py-4 mb-4 animate__animated animate__fadeIn"
        style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)' }}
      >
        <Container>
          <h1 
            className="text-center mb-0 fw-bold"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} // Added text shadow for visibility
          >
            <span className="me-2">Pokédex</span>
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
              alt="Pokeball" 
              style={{ width: '30px' }}
              className="animate__animated animate__bounce animate__infinite"
            />
          </h1>
        </Container>
      </div>
      
      <Container className="my-4 animate__animated animate__fadeIn">
        <div className="search-container position-relative mb-4">
         
        <Form.Control
  type="text"
  placeholder="Search Pokémon by name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="py-3 shadow-sm"
  style={{ 
    borderRadius: '20px', 
    paddingLeft: '20px', 
    borderColor: '#4ECDC4',
    backgroundColor: '#FFFFFF', // Simplified to solid color for reliability
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  }}
/>
          <i className="bi bi-search position-absolute" style={{ right: '20px', top: '14px', color: '#FF6B6B' }}></i>
        </div>
        
        {loading ? (
          <div className="text-center py-5 animate__animated animate__pulse animate__infinite">
            <div className="mb-3">
              <Spinner animation="border" style={{ color: '#FF6B6B' }} className="me-2" />
              <span className="fs-5" style={{ color: '#2D3436' }}>Loading Pokémon data...</span>
            </div>
            <div className="progress" style={{ height: '10px', maxWidth: '400px', margin: '0 auto' }}>
              <div 
                className="progress-bar progress-bar-striped progress-bar-animated" 
                role="progressbar" 
                style={{ width: `${loadingProgress}%`, backgroundColor: '#4ECDC4' }}
                aria-valuenow={loadingProgress} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
            <div className="mt-2" style={{ color: '#636E72' }}>{loadingProgress}%</div>
          </div>
        ) : (
          <>
            <p className="mb-4" style={{ color: '#636E72' }}>Showing {filteredPokemons.length} of 151 Pokémon</p>
            
            {filteredPokemons.length === 0 ? (
              <div className="text-center py-5">
                <div className="fs-4 mb-3" style={{ color: '#636E72' }}>No Pokémon found matching "{search}"</div>
                <button 
                  className="btn btn-outline-primary" 
                  onClick={() => setSearch('')}
                  style={{ borderColor: '#FF6B6B', color: '#FF6B6B' }}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <Row>
                {filteredPokemons.map((pokemon, index) => {
                  const details = pokemonDetails[pokemon.name];
                  const pokemonId = details?.id || index + 1;
                  
                  return (
                    <Col key={index} xs={6} sm={4} md={3} lg={3} className="mb-4">
                      <Card 
                        className="h-100 border-0 shadow-sm animate__animated animate__fadeIn pokemon-card"
                        style={{ 
                          borderRadius: '15px', 
                          overflow: 'hidden',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          background: getCardGradient(details?.types)
                        }}
                      >
                        <div 
                          className="card-img-container position-relative"
                          style={{ 
                            background: 'transparent',
                            padding: '20px'
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                            className="img-fluid p-2 pokemon-image"
                            style={{ 
                              transition: 'transform 0.3s'
                            }}
                          />
                          <div className="position-absolute top-0 end-0 p-2">
                            <Badge 
                              style={{ 
                                backgroundColor: '#2D3436', 
                                color: '#FFFFFF', 
                                fontWeight: '600' 
                              }}
                              className="fw-bold"
                            >
                              #{String(pokemonId).padStart(3, '0')}
                            </Badge>
                          </div>
                        </div>
                        
                        <Card.Body className="text-center">
                          <Card.Title 
                            className="text-capitalize mb-2 fw-bold"
                            style={{ color: '#2D3436' }}
                          >
                            {pokemon.name}
                          </Card.Title>
                          
                          {details?.types && (
                            <div className="mb-3">
                              {details.types.map((typeInfo, idx) => (
                                <Badge 
                                  key={idx}
                                  className="me-1 text-white"
                                  style={{ 
                                    backgroundColor: getTypeColor(typeInfo.type.name),
                                    fontSize: '0.8rem',
                                    padding: '6px 12px',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                  }}
                                >
                                  {typeInfo.type.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <Link 
                            to={`/pokemon/${pokemon.name}`} 
                            className="btn w-100"
                            style={{
                              borderRadius: '10px', 
                              padding: '8px',
                              fontWeight: '500',
                              backgroundColor: '#FF6B6B',
                              borderColor: '#FF6B6B',
                              color: '#FFFFFF',
                              transition: 'background-color 0.3s'
                            }}
                          >
                            View Details
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </>
        )}
      </Container>
      
      {/* Updated CSS for animations and hover effects */}
      <style jsx>{`
        .pokemon-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
        }
        
        .pokemon-card:hover .pokemon-image {
          transform: scale(1.05);
        }
        
        .pokemon-card .btn:hover {
          background-color: #FF8787 !important;
          border-color: #FF8787 !important;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default Home;