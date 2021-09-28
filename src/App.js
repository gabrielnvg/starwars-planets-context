import React from 'react';
import ContextProviders from './contexts';

import { Number, Button } from './components/PlanetInfo/PlanetInfo';

function App() {
  return (
    <ContextProviders>
      <Button />
      <Number />
    </ContextProviders>
  );
}

export default App;
