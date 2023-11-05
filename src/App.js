import { useState } from "react";
import "./App.css";
import Staking from "./Staking"
import NavBar from "./NavBar"

function App(){
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts}/>
        <Staking accounts={accounts} setAccounts={setAccounts}/>
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;