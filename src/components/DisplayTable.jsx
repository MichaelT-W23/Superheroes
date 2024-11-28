import React, { useState } from 'react';
import CustomAlert from './CustomAlert';
import styles from '../styles/components/DisplayTable.module.css';

const DisplayTable = ({ data, onRemove }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRemoveClick = (user) => {
    setSelectedUser(user);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    onRemove(selectedUser.userId);
    setShowAlert(false);
  };

  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className={styles["header-cell"]}>
                {key}
              </th>
            ))}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.userId} className={styles['table-row']}>
              {Object.keys(item).map((key) => (
                <td key={`${item.userId}-${key}`} className={styles.cell}>
                  {item[key]}
                </td>
              ))}
              <td className={styles["actions-cell"]}>
                <button
                  className={styles["remove-btn"]}
                  onClick={() => handleRemoveClick(item)}
                >
                  &minus;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAlert && selectedUser && (
        <CustomAlert
          message="Delete User"
          subtext={`Are you sure you want to delete the user: "${selectedUser.name}"?`} 
          closeButtonColor="red"
          onClose={() => setShowAlert(false)}
          action={handleConfirmDelete}
          cancelButton={true}
          buttonText="Delete user"
        />
      )}
    </div>
  );
};

export default DisplayTable;
