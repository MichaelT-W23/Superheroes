import React, { useState, useEffect } from 'react';
import SuperheroCard from '../components/SuperheroCard';
import styles from '../styles/views/HomePage.module.css';

function HomePage() {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await fetch('/Superheroes/superheroes.json');
        const data = await response.json();
        if (data && data.Superheroes) {
          setSuperheroes(data.Superheroes);
        }
      } catch (error) {
        console.error('Failed to fetch superheroes:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSuperheroes();
  }, []);
  

  return (
    <div>
      <div className={styles['superheroes-grid']}>
        {loading ? (
          <p>Loading superheroes...</p>
        ) : superheroes.length > 0 ? (
          superheroes.map((superhero) => (
            <SuperheroCard key={superhero.superId} superhero={superhero} canNavigate={true} />
          ))
        ) : (
          <p>No Superheroes. Go ahead and add some!</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
