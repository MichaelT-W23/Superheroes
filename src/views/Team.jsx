import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuperheroes, removeTeamSuperhero } from '../states/team';
import SuperheroCard from '../components/SuperheroCard';
import styles from '../styles/views/Team.module.css';

function SuperheroTeam() {
  const superheroes = useSelector(getAllSuperheroes);
  const dispatch = useDispatch();

  const unaddHero = (superhero) => {
    dispatch(removeTeamSuperhero(superhero));
  };

  return (
    <div className={styles.container}>
      <h1>Your Superhero Team</h1>
      <ul className={styles['superhero-list']}>
        {superheroes.map(hero => (
          <li key={hero.superId} className={styles['superhero-item']}>
            <SuperheroCard superhero={hero} />
            <button onClick={() => unaddHero(hero)} className={styles.button}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperheroTeam;
