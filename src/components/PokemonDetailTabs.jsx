// components/PokemonDetailTabs.jsx
import { useState } from 'react';
import { Card, Nav, Tab, ProgressBar, Row, Col, Badge } from 'react-bootstrap';
import { getStatColor } from '../utils/pokemonUtils';

function PokemonDetailTabs({ pokemon }) {
  const [activeTab, setActiveTab] = useState('stats');

  return (
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
            <StatsTab stats={pokemon.stats} />
          </Tab.Pane>
          
          <Tab.Pane active={activeTab === 'abilities'}>
            <AbilitiesTab abilities={pokemon.abilities} />
          </Tab.Pane>
          
          <Tab.Pane active={activeTab === 'moves'}>
            <MovesTab moves={pokemon.moves} />
          </Tab.Pane>
        </Tab.Content>
      </Card.Body>
    </Card>
  );
}

function StatsTab({ stats }) {
  const totalStats = stats.reduce((total, stat) => total + stat.base_stat, 0);

  return (
    <>
      <h4 className="mb-3 border-bottom pb-2">Base Stats</h4>
      {stats.map((stat) => {
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
        <h6>Total: <span className="fw-bold ms-2">{totalStats}</span></h6>
      </div>
    </>
  );
}

function AbilitiesTab({ abilities }) {
  return (
    <>
      <h4 className="mb-3 border-bottom pb-2">Abilities</h4>
      <Row xs={1} md={2} className="g-3">
        {abilities.map((ability) => (
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
    </>
  );
}

function MovesTab({ moves }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h4 className="mb-0">Moves</h4>
        <small className="text-muted">Showing first 20 of {moves.length}</small>
      </div>
      <Row xs={1} md={2} className="g-2">
        {moves.slice(0, 20).map((move, index) => (
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
    </>
  );
}

export default PokemonDetailTabs;