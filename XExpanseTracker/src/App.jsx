import React from "react";
import ExpanseTracker from "./Component/Expanse/ExpanseTracker";
import TransactionData from "./Component/Transactions/TransactionData";

function App() {

  return (
    <div style={{width: "100%"}}>
      <ExpanseTracker/>
      <TransactionData/>
    </div>
  )
}

export default App
