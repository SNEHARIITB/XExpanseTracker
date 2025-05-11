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
// import DeleteIcon from "@mui/icons-material/Cancel";
// import EditIcon from "@mui/icons-material/Edit";
// import WifiIcon from "@mui/icons-material/Wifi";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import styles from "./RecentTransactions.module.css";


const RecentTransactions = () => {
    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        const localdata = localStorage.getItem("expenses");
        if (localdata) {
          try {
            setExpenses(JSON.parse(localdata));
          } catch (err) {
            console.error("Error parsing localStorage data:", err);
          }
        }
    
    },[]);
    console.log(expenses)
    useEffect(() =>{},[expenses]);
    
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
                {/* <IconButton color="error">
                <DeleteIcon />
                </IconButton>
                <IconButton color="warning">
                <EditIcon />
                </IconButton> */}
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
    </Box>
    );
}
export default RecentTransactions;