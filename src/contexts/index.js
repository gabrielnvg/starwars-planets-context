import React from 'react';

import { PlanetContextProvider } from './modules/planet';

const combineProviders = (...providers) =>
  providers.reduce(
    (acc, curr) => ({ children }) =>
      React.createElement(acc, null, React.createElement(curr, null, children)),
    ({ children }) => React.createElement(React.Fragment, null, children),
  );

const providers = [PlanetContextProvider];

const ContextProviders = combineProviders(...providers);

export default ContextProviders;
