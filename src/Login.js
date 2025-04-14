import React, { useState } from 'react';
import  Ip  from './Ip';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null); // 'success' vagy 'error'

 


  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Ip.Ipcim+'web/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Hibás bejelentkezési adatok');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setAlertMessage('Sikeres bejelentkezés!');
      setAlertType('success');
      setTimeout(() => {
        window.location.href = '/open'; // Átirányítás a védett oldalra
      }, 1500); // 1.5 másodperc múlva átirányítás
    } catch (err) {
      setAlertMessage(err.message);
      setAlertType('error');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Log In</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your username"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" style={styles.button}>
          Log in
        </button>
      </form>

      {/* Custom alert box */}
      {alertMessage && (
        <div style={alertType === 'success' ? styles.successAlert : styles.errorAlert}>
          <p style={styles.alertText}>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

// Stílusok
const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9', // Világos háttér
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    fontSize: '16px',
    color: '#333',
  },
  input: {
    width: '80%',
    padding: '12px',
    fontSize: '16px',
    marginTop: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    padding: '12px 0',
    fontSize: '16px',
    backgroundColor: '#2d6a4f', // Sötétzöld
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  successAlert: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    marginTop: '20px',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  errorAlert: {
    backgroundColor: '#E74C3C',
    color: '#fff',
    padding: '10px 20px',
    marginTop: '20px',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  alertText: {
    margin: 0,
  },
};

export default Login;
