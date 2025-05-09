import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import { Spinner } from 'react-bootstrap';
import Home from './pages/Home';


// Lazy load PokemonDetail
const PokemonDetail = lazy(() => import('./pages/PokemonDetails'));

function App() {
  return (

    <Router>
         
      <Suspense fallback={<div className="text-center"><Spinner animation="border" variant="primary" /></div>}>
        <Routes>
   
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
