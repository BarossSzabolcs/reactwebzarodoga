import { useState,useEffect } from "react";
import Navbar from "./Navbar";

const Rangok=()=>{
    const [adatok,setAdatok] =useState([])

    const letoltes=async ()=>{
        let x=await fetch("http://localhost:5000/RangokCsoportosit")
        let y=await x.json()
        setAdatok(y)            
    }
  
    useEffect(()=>{
        letoltes()
    },[])
    const adminJog =async  (rang_felhasznalo) => {
      
      
      let adatok = 
      
      {
        "bevitel1":1,
        "bevitel2":rang_felhasznalo,
        
      }

        let x=await fetch("http://localhost:5000/JogAdasElvetel",
        {
          method: "PUT",
          body: JSON.stringify(adatok),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        let y=await x.text()
        
        
      
      
   
      
       
      
    
    };
    const normalJog =async  (rang_felhasznalo) => {
      
      
      let adatok = 
      
      {
        "bevitel1":0,
        "bevitel2":rang_felhasznalo,
      }

        let x=await fetch("http://localhost:5000/JogAdasElvetel",
        {
          method: "PUT",
          body: JSON.stringify(adatok),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        let y=await x.text()
        
        alert(y)
      
      
   
      
       
      
    
    };

    return (
        <div>
            <Navbar />
            <div styles={{textAlign:'center',border:'5px solid black',margin:'5px'}}>
                <h1>Rangok</h1>
                <p>Felhasználók:</p>
                </div>
                {
                       adatok.map((item, key)=>(
                        <div key={key} style={{textAlign:'center',border:'5px solid black',margin:'5px', padding:'5px' }}>{item.felhasznalo_nev} <p>{item.rang_ertek}</p>
                        { item.rang_ertek ? 
                        
                        <div style={{color:"red"}}>
                          Admin
                          <button style={{color:"red"}} onClick={() => normalJog(item.rang_felhasznalo)}>Admin jog elvétele!</button>
                        </div>
                        :
                        <div style={{color:"blue"}}>
                          Normál
                          <button style={{color:"blue"}} onClick={() => adminJog(item.rang_felhasznalo)}>Admin jog adása!</button>
                        </div>
                        
                        }
                        </div>
                    )
                    )
                }
            </div>
    )
    
}
const styles = {
    content: {
      padding: '20px',
      textAlign: 'center',
      border: '5px'


    },
    mapcontent:{
        padding:'20px',
        textAlign:'center',
        border:'5px',
        
        
      },
  };
export default Rangok