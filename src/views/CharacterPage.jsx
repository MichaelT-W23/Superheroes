import { useLocation } from 'react-router-dom';
import SuperheroCard from '../components/SuperheroCard';
import styles from "../styles/views/CharacterPage.module.css";
import { useCallback, useState } from 'react';
import { addTeamSuperhero, removeTeamSuperhero, isSuperheroInTeam } from '../states/team';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from '../components/CustomAlert';

function CharacterPage() {
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();
  const { superhero } = location.state || {};

  const dispatch = useDispatch();
  
  const [isUserSuperhero, setIsUserSuperhero] = useState(false);

  const isInTeam = useSelector((state) => isSuperheroInTeam(state, superhero?.superId));

  const handleAddSuperheroClick = useCallback(async () => {
    if (superhero) {
      try {
        if (isUserSuperhero) {
          setShowAlert(true)
          setIsUserSuperhero(false);
        } else {
          setShowAlert(true)
          setIsUserSuperhero(true);
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    } else {
      console.log("No superhero data available");
    }
  }, [superhero, isUserSuperhero]);


  const handleTeamButtonClick = useCallback(() => {
    if (superhero) {
      if (isInTeam) {
        dispatch(removeTeamSuperhero({ superId: superhero.superId }));
      } else {
        dispatch(addTeamSuperhero(superhero));
      }
    } else {
      console.log("No superhero data available");
    }
  }, [superhero, isInTeam, dispatch]);


  const handleDeleteFromDatabase = () => {
  
  }

  return (
    <div className={styles["character-page-container"]}>
      
      <div className={styles["content-container"]}>
        <h1 className={styles.title}>Character</h1>

        
          {superhero && <SuperheroCard key={superhero.superId} superhero={superhero} fullLength={false}/>}
          
          <div className={styles["button-container"]}>
            <button 
              className={`${styles["green-button"]} ${isUserSuperhero ? styles["red-button"]: ''}`}
              onClick={handleAddSuperheroClick}>
              {isUserSuperhero ? "Remove Superhero" : "Add Superhero"}
            </button>

            <button
              className={`${styles["blue-button"]} ${isInTeam ? styles["purple-button"] : ''}`}
              onClick={handleTeamButtonClick}
            >
              {isInTeam ? 'Remove from Team' : 'Add to Team'}
            </button>
          </div>
          {superhero?.canDelete && (
            <button 
              className={styles["remove-db-button"]}
              onClick={() => setShowAlert(true)}>Delete Character From Database
            </button>
            )
          }
          {showAlert && (
            <CustomAlert
              message="You can't perform that action in this version! <br><br>See <a href='https://github.com/MichaelT-W23/Superhero-Frontend' target='_blank'>here</a> for the complete version"
              closeButtonColor='red'
              onClose={() => setShowAlert(false)}
              action={handleDeleteFromDatabase}
              buttonText='Close'
            />
          )}
      </div>
    </div>
  );
}

export default CharacterPage;
