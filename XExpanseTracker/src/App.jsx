import React, { useState } from "react";
import ExpanseTracker from "./Component/Expanse/ExpanseTracker";
import TransactionData from "./Component/Transactions/TransactionData";

function App() {
  const [netBalance, setNetBalance] = useState("");
  const [updateexpense, setUpdateExpense] = useState(false);
  //console.log(updateexpense)

  return (
    <div style={{width: "100%"}}>
      <ExpanseTracker sendNetBalance={setNetBalance} updateexpense={updateexpense}/>
      <TransactionData netBalance = {netBalance} sendupdateexpense={() => setUpdateExpense(prev => !prev)}/>
    </div>
  )
}

export default App
