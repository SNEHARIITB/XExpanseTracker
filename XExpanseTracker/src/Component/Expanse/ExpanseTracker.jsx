import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import styles from "./ExpanseTracker.module.css"
import { Button, Modal, Typography,Grid } from "@mui/material";
import PieChart from "../PieChart/PieChart";
import AddExpenseForm from "../AddExpanse/AddExpanse";
import AddBalanceForm from "../AddBalance/AddBalance";

export default function Expanse({sendNetBalance,updateexpense}){

    const [expenseopen, setExpenseOpen] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [balanceopen, setBalanceOpen] = useState(false);
    const [expensesbalance, setExpensesBalance] = useState(0);
    const [netBalance,setNetBalance] = useState(0);
    
    const handleAddExpanse = () => {
        setExpenseOpen(true);
    }


    const handleAddBalance = () => {
        setBalanceOpen(true);
    }
    useEffect(()=>{
      localStorage.setItem("balance", JSON.stringify(5000));
    },[]);

    useEffect(() => {
        const localbalance = localStorage.getItem("balance");
        if (localbalance) {
          try {
            setWalletBalance(parseFloat(localbalance));
          } catch (err) {
            console.error("Error parsing localStorage data:", err);
          }
        }
    }, [balanceopen]);

    useEffect(() => {
        const localexpenses = localStorage.getItem("expenses");
        if (localexpenses) {
          try {
            const expensesArray = JSON.parse(localexpenses);
            const total = expensesArray.reduce((sum, e) => {
              const price = parseFloat(e.price) || 0;
              return sum + price;
            }, 0);
            setExpensesBalance(total);
            //setWalletBalance(walletBalance-total);
          } catch (err) {
            console.error("Error parsing localStorage data:", err);
          }
        }
      }, [expenseopen,updateexpense]);

    useEffect(() => {
      setNetBalance(walletBalance - expensesbalance);
    }, [walletBalance, expensesbalance]);

    useEffect(() => {
      sendNetBalance(netBalance);
    },[netBalance]);

    return(
    <>
    <Container fixed className={styles.trackercontainer}>
        <h1 className={styles.expansetag}>Expense Tracker</h1>
        <Box >
            <Grid container spacing={4} className={styles.trackerbox}>
                <Grid size={{xs:12, md:4}} className={styles.griditem}>
                    <Card className={styles.card}>
                        <CardContent>
                        <Typography gutterBottom>
                            Wallet Balance: <span className={styles.income}>{netBalance}</span>
                        </Typography>
                        <Button type="button" variant="contained" className={styles.incomeBtn} onClick={handleAddBalance}>
                        + Add Income
                        </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{xs:12, md:4}} className={styles.griditem}>
                    <Card className={styles.card}>
                        <CardContent>
                        <Typography gutterBottom>
                            Expenses: <span className={styles.expense}>{expensesbalance}</span>
                        </Typography>
                        <Button type="button" variant="contained" className={styles.expenseBtn}  onClick={handleAddExpanse}>
                            + Add Expense
                        </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs:12, md:4}} className={styles.griditem3}>
                {/* <Card >
                <CardContent>
                    <PieChart/>
                    </CardContent>
                    </Card> */}
                    <PieChart netBalance = {netBalance}/>
                </Grid>
            </Grid>
        </Box>
        <Modal open={expenseopen} onClose={() => setExpenseOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddExpenseForm netBalance = {netBalance} onUpdate={() => setExpenseOpen(false)}/>
        </Box>
      </Modal>
      <Modal open={balanceopen} onClose={() => setBalanceOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddBalanceForm onUpdate={() => setBalanceOpen(false)}/>
        </Box>
      </Modal>
        

    </Container>
    </>
    );
}