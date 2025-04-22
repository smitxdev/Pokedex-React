// utils/pokemonUtils.js

// Get type color based on Pokémon type
export const getTypeColor = (type) => {
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
  export const getEnglishFlavorText = (species) => {
    if (!species) return "No description available";
    
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === "en"
    );
    
    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : "No description available";
  };
  
  // Format Pokemon ID
  export const formatPokemonId = (id) => {
    return `#${String(id).padStart(3, '0')}`;
  };
  
  // Get stat color based on value
  export const getStatColor = (value) => {
    if (value < 50) return 'danger';
    if (value < 80) return 'warning';
    if (value < 100) return 'info';
    return 'success';
  };