// components/PokemonStyles.jsx
function PokemonStyles() {
    return (
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
    );
  }
  
  export default PokemonStyles;