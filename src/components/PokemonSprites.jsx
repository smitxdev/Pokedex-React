// components/PokemonSprites.jsx
import { Card, Row, Col } from 'react-bootstrap';

function PokemonSprites({ pokemon }) {
  const spriteTypes = [
    { key: 'front_default', label: 'Front Default' },
    { key: 'back_default', label: 'Back Default' },
    { key: 'front_shiny', label: 'Front Shiny' },
    { key: 'back_shiny', label: 'Back Shiny' }
  ];

  return (
    <Card className="border-0 shadow-sm mt-3 mb-4 animate__animated animate__fadeIn">
      <Card.Header className="bg-white border-bottom-0">
        <h4 className="mb-0">Sprites</h4>
      </Card.Header>
      <Card.Body>
        <Row className="text-center g-4">
          {spriteTypes.map((sprite, index) => (
            pokemon.sprites[sprite.key] && (
              <Col xs={6} sm={3} key={sprite.key}>
                <SpriteImage 
                  src={pokemon.sprites[sprite.key]} 
                  label={sprite.label}
                  delay={index * 0.2}
                />
              </Col>
            )
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

function SpriteImage({ src, label, delay = 0 }) {
  return (
    <div className="sprite-container">
      <img 
        src={src} 
        alt={label} 
        className="img-fluid sprite-image animate__animated animate__pulse animate__infinite animate__slow"
        style={{
          imageRendering: 'pixelated',
          width: '96px',
          height: '96px',
          animationDelay: `${delay}s`
        }}
      />
      <div className="text-muted small mt-2">{label}</div>
    </div>
  );
}

export default PokemonSprites;