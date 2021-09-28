import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const ActionTypes = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return { count: state.count + 1 };
    case ActionTypes.SUBTRACT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const PlanetContext = React.createContext(null);

export const usePlanet = () => {
  const context = useContext(PlanetContext);

  if (!context) {
    throw new Error(
      'usePlanet must be used within a PlanetProvider. Wrap a parent component in <PlanetProvider> to fix this error.',
    );
  }

  return context;
};

const initialState = { count: 0 };

export const PlanetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatches = {
    add: () => dispatch({ type: ActionTypes.ADD }),

    subtract: () => dispatch({ type: ActionTypes.SUBTRACT }),
  };

  const contextValue = { state, dispatches };

  return (
    <PlanetContext.Provider value={contextValue}>
      {children}
    </PlanetContext.Provider>
  );
};

PlanetContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
