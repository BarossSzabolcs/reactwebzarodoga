import React, { useState, useEffect } from "react";
import { FaUserShield, FaUserAlt } from "react-icons/fa"; 
import Navbar from "./Navbar";
import  Ip  from "./Ip";
import 'bootstrap/dist/css/bootstrap.min.css';

const Rangok = () => {
  const [adatok, setAdatok] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 

  
  const Lekerdezes = async () => {
    try {
      let response = await fetch(Ip.Ipcim+"felhasznalok-rangjai", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (response.ok) {
        let data = await response.json();
        setAdatok(data);
      } else {
        console.error("An error occurred during the query");
      }
    } catch (error) {
      console.error("An error occurred during the query", error);
    }
  };

  
  useEffect(() => {
    Lekerdezes();
  }, []);

  const frissitesRang = async (rang_felhasznalo, currentRank) => {
    alert(rang_felhasznalo)
    setSelectedUser({ rang_felhasznalo, currentRank }); 
    setShowModal(true); 
  };

  const handleConfirm = async () => {
    const { rang_felhasznalo, currentRank } = selectedUser;
    const newRank = currentRank === 1 ? 0 : 1;  
    try {
      
      let response = await fetch(Ip.Ipcim+"update-rank", {
        method: "POST",
        body: JSON.stringify({
          user_id: rang_felhasznalo,  
          new_rank: newRank,  
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const message = await response.json();

      if (response.ok) {
        alert(message.message); 
        Lekerdezes(); 
      } else {
        alert(message.error || "Error when updating the rank");
      }
    } catch (error) {
      console.error("Error when updating the rank:", error);
    } finally {
      setShowModal(false); 
    }
  };

  const handleCancel = () => {
    setShowModal(false); 
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Users and Ranks</h1>
        {adatok.length === 0 ? (
          <p style={styles.noData}>There are no users available.</p>
        ) : (
          <div>
            {adatok.map((item, index) => (
              item.rang_ertek === 1 || item.rang_ertek === 0 ? (  
                <div key={index} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <p style={styles.userText}>
                      {item.felhasznalo_nev} -{" "}
                      {item.rang_ertek === 1 ? (
                        <span style={styles.adminText}>Admin</span>
                      ) : (
                        <span style={styles.userText}>User</span>
                      )}
                    </p>
                  </div>

                  
                  <div style={styles.iconContainer}>
                    {item.rang_ertek === 1 ? (
                      <FaUserShield style={styles.icon} />
                    ) : (
                      <FaUserAlt style={styles.icon} />
                    )}
                  </div>

                  
                  <button
                    style={styles.button}
                    onClick={() => frissitesRang(item.rang_felhasznalo, item.rang_ertek)}
                  >
                    {item.rang_ertek === 1
                      ? "Take away admin rights"
                      : "Grant admin rights"}
                  </button>
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Are you sure you want to change the rank?</h2>
            <div>
              <button style={styles.modalButton} onClick={handleConfirm}>Yes</button>
              <button style={styles.modalButton} onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#D5E2D5", 
    color: "#fff", 
    minHeight: "100vh",
  },
  title: {
    fontSize: "36px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#1B3F1B", 
    transition: "color 0.3s ease",
  },
  noData: {
    fontSize: "18px",
    color: "#BDC3C7", 
  },
  cardContainer: {
    display: "grid", 
    gridTemplateColumns: "repeat(3, 1fr)", 
    gap: "20px", 
    justifyContent: "center", 
    padding: "0 10px", 
  },
  card: {
    backgroundColor: "#F7FFF7", // Világos zöld kártyák
    padding: "15px",  // Kisebb padding
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    cursor: "pointer", // To indicate the card is clickable
    width: "100%", // Kártya teljes szélességű
    maxWidth: "280px", // Maximális szélesség
    marginLeft: "auto", // Középre igazítja
    marginRight: "auto", // Középre igazítja
  },
  cardHeader: {
    marginBottom: "15px",
    transition: "transform 0.2s ease", // Smooth transform on hover
  },
  userText: {
    fontSize: "20px",
    color: "#1B3F1B", // Sötétzöld szöveg
  },
  adminText: {
    fontSize: "20px",
    color: "#E74C3C", // Piros admin szöveg
    fontWeight: "bold",
  },
  iconContainer: {
    marginBottom: "15px",
    fontSize: "24px",
    color: "#000", // Fekete ikonok
  },
  icon: {
    fontSize: "36px",
    margin: "0 10px",
    transition: "transform 0.3s", // Smooth scale effect on hover
    ":hover": {
      transform: "scale(1.2)", // Scaling effect on hover
    },
  },
  button: {
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#1B3F1B", // Sötétzöld gomb háttér
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    outline: "none",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },

  // Modal stílusok
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Elhomályosított háttér
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(5px)", // Blur effektus a háttérre
    animation: "fadeIn 0.5s ease-in-out", // Fade-in animation for modal
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "300px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    animation: "fadeIn 0.3s ease-out", // Modal fade-in animation
  },
  modalTitle: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  modalButton: {
    padding: "10px 20px",
    margin: "0 10px",
    backgroundColor: "#1B3F1B", // Sötétzöld
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },

  // Média lekérdezések (responsive design)
  "@media (max-width: 1200px)": { // Közepes képernyőméret (pl. tablet)
    cardContainer: {
      gridTemplateColumns: "repeat(2, 1fr)", // Két oszlop
    },
  },
  "@media (max-width: 768px)": { // Kisebb képernyőméret (pl. mobil)
    cardContainer: {
      gridTemplateColumns: "1fr", // Egy oszlop
    },
  },
};


const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`, styleSheet.cssRules.length);

export default Rangok;
