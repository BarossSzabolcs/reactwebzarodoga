import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Plot from 'react-plotly.js';
import  Ip  from './Ip';

const Diagram = () => {
  const [chartData, setChartData] = useState({ x: [], y: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(Ip.Ipcim+'diagramLekerdez')
      .then((response) => {
        if (!response.ok) {
          throw new Error('A network error has occurred');
        }
        return response.json();
      })
      .then((data) => {
        const x = data.map((item) => item.felhasznalo_nev);
        const y = data.map((item) => item.Belepesek);

        const sortedData = x
          .map((value, index) => ({ x: value, y: y[index] }))
          .sort((a, b) => a.y - b.y);

        const sortedX = sortedData.map((item) => item.x);
        const sortedY = sortedData.map((item) => item.y);

        setChartData({ x: sortedX, y: sortedY });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('The data could not be loaded.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <h1>User logins</h1>
        

        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <Plot
            data={[
              {
                type: 'bar',
                x: chartData.x,
                y: chartData.y,
                marker: {
                  color: chartData.y.map((_, index) => `hsl(${(index * 30) % 360}, 100%, 50%)`),
                  line: {
                    color: 'rgba(0, 0, 0, 0.8)',
                    width: 2,
                  },
                  opacity: 0.9,
                  borderRadius: 10,
                },
                width: 0.4, 
                hoverinfo: 'x+y',
              },
            ]}
            layout={{
              title: 'Number of logins per user',
              scene: {
                xaxis: { title: 'User' },
                yaxis: { title: 'Number of logins' },
              },
              barmode: 'group',
              plot_bgcolor: 'rgba(0,0,0,0)',
              paper_bgcolor: 'rgba(255,255,255,0.95)',
              margin: { l: 40, r: 40, t: 40, b: 100 },
            }}
            style={{ width: '80%', height: '70vh', margin: 'auto' }}
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
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Diagram;
