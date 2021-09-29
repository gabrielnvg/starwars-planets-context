import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchWithTimeout from '../../assets/js/utils/fetchWithTimeout';
import randomizeIntWithinRange from '../../assets/js/utils/randomizeIntWithinRange';
import formatPlanet from '../../assets/js/utils/formatPlanet';

const apiPrefix = 'https://swapi.dev/api';

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

const types = {
  SET_FETCH_LOADING: 'planet/SET_FETCH_LOADING',
  SET_FETCH_ERROR: 'planet/SET_FETCH_ERROR',
  SET_TOTAL_PLANETS: 'planet/SET_TOTAL_PLANETS',
  SET_CURRENT_PLANET: 'planet/SET_CURRENT_PLANET',
};

const initialState = {
  fetchStatus: {
    isLoading: true,
    hasError: false,
  },
  totalPlanets: 0,
  fetchedPlanets: {},
  currentPlanet: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_FETCH_LOADING:
      return {
        ...state,
        fetchStatus: {
          isLoading: action.isLoading,
          hasError: false,
        },
      };
    case types.SET_FETCH_ERROR:
      return {
        ...state,
        fetchStatus: {
          isLoading: false,
          hasError: action.hasError,
        },
      };
    case types.SET_TOTAL_PLANETS:
      return {
        ...state,
        totalPlanets: action.totalPlanets,
      };
    case types.SET_CURRENT_PLANET:
      return {
        ...state,
        fetchStatus: {
          isLoading: false,
          hasError: false,
        },
        fetchedPlanets: {
          ...state.fetchedPlanets,
          [action.planetId]: action.planet,
        },
        currentPlanet: action.planet,
      };
    default:
      return state;
  }
};

export const PlanetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setFetchLoading = isLoading =>
    dispatch({
      type: types.SET_FETCH_LOADING,
      isLoading,
    });

  const setFetchError = hasError =>
    dispatch({ type: types.SET_FETCH_ERROR, hasError });

  const setTotalPlanets = totalPlanets =>
    dispatch({ type: types.SET_TOTAL_PLANETS, totalPlanets });

  const setCurrentPlanet = (planetId, planet) =>
    dispatch({ type: types.SET_CURRENT_PLANET, planetId, planet });

  const fetchRandomPlanet = planetId => {
    if (planetId in state.fetchedPlanets) {
      setTimeout(() => {
        setCurrentPlanet(planetId, state.fetchedPlanets[planetId]);
      }, 300);
    } else {
      fetchWithTimeout({
        url: `${apiPrefix}/planets/${planetId}/`,
        timeout: 10000,
      })
        .then(response => response.json())
        .then(planet => {
          setCurrentPlanet(planetId, formatPlanet(planet));
        })
        .catch(() => {
          setFetchError(true);
        });
    }
  };

  const initialFetches = () => {
    fetchWithTimeout({
      url: `${apiPrefix}/planets/`,
      timeout: 10000,
    })
      .then(response => response.json())
      .then(planets => {
        setTotalPlanets(planets.count);
        fetchRandomPlanet(randomizeIntWithinRange(1, planets.count));
      })
      .catch(() => {
        setFetchError(true);
      });
  };

  const contextValue = {
    state,
    dispatches: {
      setFetchLoading,
      setFetchError,
      setTotalPlanets,
      setCurrentPlanet,
      fetchRandomPlanet,
      initialFetches,
    },
  };

  return (
    <PlanetContext.Provider value={contextValue}>
      {children}
    </PlanetContext.Provider>
  );
};

PlanetContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
