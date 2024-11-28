import React, { useState, useEffect } from 'react';
import SuperheroCard from '../components/SuperheroCard';
import styles from '../styles/views/Powers.module.css';

function Powers() {
  const [powers, setPowers] = useState([]);
  const [selectedPowerId, setSelectedPowerId] = useState('');
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    fetch('/Superheroes/powers.json')
      .then(response => response.json())
      .then(data => {
        setPowers(data.Powers);
      })
      .catch(error => {
        console.error('Error fetching powers:', error);
      });
  }, []);

  const handlePowerChange = (event) => {
    const selectedId = event.target.value;
    setSelectedPowerId(selectedId);

    fetch('/Superheroes/superheroes.json')
      .then(response => response.json())
      .then(data => {
        const filteredSuperheroes = data.Superheroes.filter(superhero =>
          superhero.powers.some(power => power.powerId === parseInt(selectedId))
        );
        setSuperheroes(filteredSuperheroes);
      })
      .catch(error => {
        console.error('Error fetching superheroes:', error);
      });
  };

  return (
    <div className={styles["powers-page"]}>
      <h1 className={styles["powers-title"]}>Powers</h1>
      <select value={selectedPowerId} onChange={handlePowerChange} className={styles["power-selector"]}>
        <option className={styles["option-text"]} value="" disabled>Select a power</option>
        {powers.map(power => (
          <option key={power.powerId} value={power.powerId} className={styles["option-text"]}>
            {power.name}
          </option>
        ))}
      </select>

      {selectedPowerId && (
        <h2 className={styles["selected-power"]}>
          You selected: {powers.find(power => power.powerId === parseInt(selectedPowerId))?.name} ({superheroes.length} result{superheroes.length > 1 ? 's' : ''})
        </h2>
      )}

      <div className={styles["superhero-power-container"]}>
        {superheroes.length > 0 ? (
          superheroes.map(superhero => (
            <SuperheroCard 
              key={superhero.superId} 
              superhero={superhero} 
              canNavigate={true}
              fullLength={false}
            />
          ))
        ) : (
          selectedPowerId && <p>No superheroes found for this power.</p>
        )}
      </div>
    </div>
  );
}

export default Powers;
