import React from 'react';
import { usePlanet } from '../../contexts/modules/planet';

export const Button = () => {
  const { subtract, add } = usePlanet().dispatches;

  return (
    <>
      <button type="button" onClick={() => subtract()}>
        -
      </button>

      <button type="button" onClick={() => add()}>
        +
      </button>
    </>
  );
};

export const Number = () => {
  const planet = usePlanet().state;

  return <>{planet.count}</>;
};
