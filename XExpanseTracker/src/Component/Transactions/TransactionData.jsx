import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from "./TransactionData.module.css"
import TopExpanse from "../TopExpanse/TopExpanse";
import RecentTransactions from "../RecentTransactions/RecentTransactions";

export default function Expanse(){

    return(
    <>
    <Container fixed className={styles.headcontainer}>
        <Box className={styles.rtransactionsbox}>
            <h2 className={styles.headtag}>Recent Transactions</h2>
            
            <Box className= {styles.headbox}>
                <RecentTransactions/>
            </Box>
        </Box>
        <Box className={styles.texpansesbox}>        
            <h2 className={styles.headtag}>Top Expanses</h2>
            
            <Box className= {styles.headbox}>
                <TopExpanse/>
            </Box>
        </Box>
    </Container>
    </>
    );
}