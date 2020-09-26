import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PlanetInfo.module.scss';

import svgInfoSeparator from '../../assets/images/svg/info-separator.svg';

function PlanetInfo() {
  const planet = useSelector(state => state.planet.currentPlanet);

  return (
    <div className={styles['planet-info']}>
      <div className={styles.name}>{planet.name}</div>

      <div className={styles['info-container']}>
        <div className={styles['info-row']}>
          <div className={styles['info-key']}>Population:</div>
          <div className={styles['info-value']}>{planet.population}</div>
        </div>

        <img
          className={styles['info-separator']}
          src={svgInfoSeparator}
          alt="info separator"
        />

        <div className={styles['info-row']}>
          <div className={styles['info-key']}>Climate:</div>
          <div className={styles['info-value']}>
            {planet.climate.map((climate, index) => (
              <div
                key={`climate-${index + 1}`}
                className={styles['info-value__item']}
              >
                {`${climate}${index + 1 === planet.climate.length ? '' : ','}`}
              </div>
            ))}
          </div>
        </div>

        <img
          className={styles['info-separator']}
          src={svgInfoSeparator}
          alt="info separator"
        />

        <div className={styles['info-row']}>
          <div className={styles['info-key']}>Terrain:</div>
          <div className={styles['info-value']}>
            {planet.terrain.map((terrain, index) => (
              <div
                key={`terrain-${index + 1}`}
                className={styles['info-value__item']}
              >
                {`${terrain}${index + 1 === planet.terrain.length ? '' : ','}`}
              </div>
            ))}
          </div>
        </div>

        <img
          className={styles['info-separator']}
          src={svgInfoSeparator}
          alt="info separator"
        />

        <div
          className={`${styles['info-row']} ${styles['info-row--featured-films']}`}
        >
          Featured in{' '}
          <span className={styles['number-films-featured']}>
            {planet.films}
          </span>{' '}
          {planet.films < 2 ? 'film' : 'films'}
        </div>
      </div>
    </div>
  );
}

export default PlanetInfo;
