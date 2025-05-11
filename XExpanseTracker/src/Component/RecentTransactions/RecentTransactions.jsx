import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import WifiIcon from "@mui/icons-material/Wifi";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Button, Modal,Grid } from "@mui/material";
import styles from "./RecentTransactions.module.css";
import EditExpenseForm from "../EditExpense/EditExpense";


const RecentTransactions = ({netBalance,sendupdateexpense}) => {
    const [expenses, setExpenses] = useState([]);
    const [editexpenseopen, setEditExpenseOpen] = useState(false);
    const [editexpenseid, setEditExpenseId] = useState("");
    const [deleteexpenseid, setDeleteExpenseId] = useState("");

    useEffect(() => {
    if (!deleteexpenseid) return;
    const existing = JSON.parse(localStorage.getItem("expenses")) || [];
    const updated = existing.filter((e) => e.id !== deleteexpenseid);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setExpenses(updated); // update UI state
    sendupdateexpense(Date.now()); // trigger parent recalculation
    }, [deleteexpenseid]);


    useEffect(() => {
        const localdata = localStorage.getItem("expenses");
        if (localdata) {
          try {
            setExpenses(JSON.parse(localdata));
          } catch (err) {
            console.error("Error parsing localStorage data:", err);
          }
        }
    
    },[netBalance,editexpenseopen]);
    //console.log(expenses)
    useEffect(() => {
        setPage(1); // Reset page to 1 when expenses change
      }, [expenses]);
    
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const currentItems = expenses.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return(
        <Box className={styles.container}>
           {expenses.length === 0 ? (
                <Typography>No recent transactions found</Typography>
                    ) : ( 
                        <>
                        {currentItems.map((item) => (
                            <Card key={item.id} className={styles.card}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                {/* {item.icon} */}
                                <Box>
                                <Typography variant="subtitle1">{item.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.date}
                                </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography color="orange">₹{item.price}</Typography>
                                <IconButton color="error">
                                <DeleteIcon onClick={() => {
                                        setDeleteExpenseId(item.id);                                       
                                    }}/>
                                </IconButton>
                                <IconButton color="warning">
                                <EditIcon    onClick={() => {
                                        setEditExpenseId(item.id);
                                        setEditExpenseOpen(true);
                                    }}
                                    />
                                </IconButton>
                            </Box>
                            </Card>
                        ))}
                        <Stack direction="row" justifyContent="center">
                            <Pagination
                            count={Math.ceil(expenses.length / itemsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            />
                        </Stack>
                        </>
                    )}
        <Modal open={editexpenseopen}   onClose={() => {
            setEditExpenseOpen(false);
            setEditExpenseId(""); // clear id
        }}>
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
          <EditExpenseForm netBalance = {netBalance} editid= {editexpenseid} onUpdate={() => {setEditExpenseOpen(false)
                const refreshed = JSON.parse(localStorage.getItem("expenses")) || [];
                setExpenses(refreshed);}
          }/>
        </Box>
      </Modal>

        </Box>
    );
}
export default RecentTransactions;