import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/components/SuperheroCard.module.css";

const SuperheroCard = ({ superhero, canNavigate = false, fullLength = true }) => {
  const { name, realName, universe, yearCreated, image, powers } = superhero;
  const navigate = useNavigate();

  const handleClick = () => {
    if (canNavigate) {
      navigate('/Character', { state: { superhero } });
    } else {
      console.log('Navigation is disabled.');
    }
  };

  const displayPowers = fullLength ? [
    ...powers,
    ...Array.from({ length: 3 - powers.length }).map(() => ({
      powerId: Math.floor(Math.random() * 2) + 2,
      name: 'No power'
    }))
  ] : powers

  const handleImageError = (event) => {
    console.error(`Failed to load image for ${name}`, event);
  };

  return (
    <div
      className={`${styles["superhero-card"]} ${canNavigate ? styles["hoverable"] : ""}`}
      onClick={handleClick}
      style={{ cursor: canNavigate ? 'pointer' : 'default' }}
    >
      <h2>{name}</h2>
      <img
        src={`/Superheroes/pics/${image}`}
        alt={name}
        style={{ height: '220px', width: '200px' }}
        onError={handleImageError}
      />
      <p><strong>Real Name:</strong> {realName}</p>
      <p><strong>Universe:</strong> {universe}</p>
      <p><strong>Year Created:</strong> {yearCreated}</p>
      <h3>Powers:</h3>
      <ul>
        {displayPowers.map((power, index) => (
          <li
            key={index}
            style={{ opacity: power.name === 'No power' ? 0 : 1 }}
          >
            {power.name}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default SuperheroCard;
