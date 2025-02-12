import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
// eslint-disable-next-line
import Plot from 'react-plotly.js';

const Diagram = () => {
  const [chartData, setChartData] = useState({ x: [], y: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:5000/szavazatCsoportosit') // Módosítsd az URL-t, ha szükséges
      .then((response) =>  {
        if (!response.ok) {
          throw new Error('Hálózati hiba történt');
        }
        return response.json();
      })
      .then((data) => {
        const x = data.map((item) => item.film_cim); // Példa: kategóriák az x tengelyhez
        const y = data.map((item) => item.darab);    // Példa: szavazatok az y tengelyhez

        setChartData({ x, y });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Nem sikerült betölteni az adatokat.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <h1>Diagram</h1>
        <p>Itt találhatóak a diagramok.</p>

        {loading && <p>Adatok betöltése...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <Plot
            data={[
              {
                x: chartData.x,
                y: chartData.y,
                type: 'bar',
                marker: { color: 'blue' },
              },
            ]}
            layout={{
              title: 'Szavazatok Diagramja',
              xaxis: { title: 'Kategóriák' },
              yaxis: { title: 'Szavazatok száma' },
            }}
            style={{ width: '50%', height: '50%',margin:"auto" }}
          />
        )}
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

export default Diagram;
