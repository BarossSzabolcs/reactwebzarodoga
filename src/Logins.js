import { useState, useEffect } from "react";
import Navbar from './Navbar';
import Plot from 'react-plotly.js';
import  Ip  from "./Ip";

const Logins = () => {
    const [chartData, setChartData] = useState({ x: [], y: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(Ip.Ipcim+'BelepesekCsoportosit') // ez az endpoint adja vissza a belépésszámokat felhasználónként
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hálózati hiba történt');
                }
                return response.json();
            })
            .then((data) => {
                const x = data.map((item) => item.felhasznalo_nev);  // Felhasználónevek az x tengelyen
                const y = data.map((item) => item.darab);             // Belépésszámok az y tengelyen

                setChartData({ x, y });
                setLoading(false);
            })
            .catch((err) => {
                console.error('Hiba az adatok betöltésekor:', err);
                setError('Nem sikerült betölteni az adatokat.');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div style={styles.content}>
                <h1>Belépések diagramja</h1>
                <p>Itt látható, hogy melyik felhasználó hányszor lépett be.</p>

                {loading && <p>Adatok betöltése...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && !error && (
                    <Plot
                        data={[
                            {
                                x: chartData.x,
                                y: chartData.y,
                                type: 'bar',
                                marker: { color: 'green' }, // kicsit jobban passzol ide
                            },
                        ]}
                        layout={{
                            title: 'Felhasználói belépésszámok',
                            xaxis: { title: 'Felhasználó neve' },
                            yaxis: { title: 'Belépések száma' },
                        }}
                        style={{ width: '70%', height: '500px', margin: "auto" }}
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

export default Logins;
