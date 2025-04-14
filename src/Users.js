import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Ip  from './Ip';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(Ip.Ipcim+'felhasznalokLekerdez')
      .then((response) => {
        if (!response.ok) {
          throw new Error('A network error has occurred');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load users.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <h1 style={styles.title}>Users</h1>
        <p style={styles.description}>Here is the list of users:</p>

        {loading && <p style={styles.loadingText}>Loading data...</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        {/* Felhasználók listája */}
        {!loading && !error && (
          <div style={styles.usersContainer}>
            {users.length > 0 ? (
              <ul style={styles.userList}>
                {users.map((user, index) => (
                  <li key={index} style={styles.userItem}>
                    {user.felhasznalo_nev}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={styles.noUsers}>There are no users.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
    padding: '30px 0',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '1.2rem',
    color: '#777',
    marginBottom: '30px',
  },
  loadingText: {
    fontSize: '1.2rem',
    color: '#888',
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: '1.2rem',
    color: '#d9534f',
    fontWeight: 'bold',
  },
  usersContainer: {
    width: '100%',
    padding: '10px 0',
  },
  userList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  userItem: {
    backgroundColor: '#f8f9fa',
    padding: '12px 20px',
    borderRadius: '6px',
    marginBottom: '10px',
    fontSize: '1.1rem',
    color: '#333',
    fontWeight: '500',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  userItemHover: {
    backgroundColor: '#e2e6ea',
    transform: 'scale(1.02)',
  },
  noUsers: {
    fontSize: '1.2rem',
    color: '#6c757d',
  },
};

export default Users;
