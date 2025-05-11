import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from "./TransactionData.module.css";
import TopExpanse from "../TopExpanse/TopExpanse";
import RecentTransactions from "../RecentTransactions/RecentTransactions";

export default function TransactionData({netBalance,sendupdateexpense}) {
  const [updateexpense, setUpdateExpense] = useState(false);
  useEffect(() => {
    if (updateexpense) {
      sendupdateexpense(updateexpense);
    }
  }, [updateexpense]);
  return (
    <Container fixed className={styles.headcontainer}>
      <Box className={styles.rtransactionsbox}>
        <h2 className={styles.headtag}>Recent Transactions</h2>
        <Box className={styles.headbox}>
          <RecentTransactions netBalance = {netBalance} sendupdateexpense={() => setUpdateExpense(prev => !prev)}/>
        </Box>
      </Box>
      <Box className={styles.texpansesbox}>
        <h2 className={styles.headtag}>Top Expenses</h2>
        <Box className={styles.headbox}>
          <TopExpanse netBalance = {netBalance}/>
        </Box>
      </Box>
    </Container>
  );
}
