import React, { useEffect } from 'react';
import { usePlanet } from './contexts/modules/planet';
import randomizeIntWithinRange from './assets/js/utils/randomizeIntWithinRange';

import Header from './components/Header/Header';
import FetchLoading from './components/FetchLoading/FetchLoading';
import FetchError from './components/FetchError/FetchError';
import PlanetInfo from './components/PlanetInfo/PlanetInfo';
import FetchButton from './components/FetchButton/FetchButton';

function App() {
  const useMountEffect = callbackFunction => useEffect(callbackFunction, []);

  const { dispatches } = usePlanet();
  const { fetchStatus, totalPlanets } = usePlanet().state;

  useMountEffect(dispatches.initialFetches);

  const handleButtonClick = () => {
    dispatches.setFetchLoading(true);
    if (totalPlanets) {
      dispatches.fetchRandomPlanet(randomizeIntWithinRange(1, totalPlanets));
    } else {
      dispatches.initialFetches();
    }
  };

  return (
    <>
      <Header />

      <div className="main-container">
        <div className="central-container">
          {fetchStatus.hasError && <FetchError />}
          {fetchStatus.isLoading && !fetchStatus.hasError && <FetchLoading />}
          {!fetchStatus.isLoading && !fetchStatus.hasError && <PlanetInfo />}
        </div>

        <FetchButton
          text="Next"
          onClick={handleButtonClick}
          isDisabled={fetchStatus.isLoading}
        />
      </div>
    </>
  );
}

export default App;
