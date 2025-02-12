import React from 'react';
import Navbar from './Navbar';

const Users = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <h1>Felhasználók</h1>
        <p>Itt található a felhasználók listája.</p>
      </div>
    </div>
  );
};

const styles = {
  content: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default Users;
