import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Pagination,
  Stack,
  Button,
  Modal,
  Grid,
  IconButton,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FlightIcon from "@mui/icons-material/Flight";
import MovieIcon from "@mui/icons-material/Movie";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./RecentTransactions.module.css";
import EditExpenseForm from "../EditExpense/EditExpense";

const RecentTransactions = ({ netBalance, sendupdateexpense }) => {
  const [expenses, setExpenses] = useState([]);
  const [editExpenseOpen, setEditExpenseOpen] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const localData = localStorage.getItem("expenses");
    if (localData) {
      try {
        setExpenses(JSON.parse(localData));
      } catch (err) {
        console.error("Error parsing localStorage data:", err);
      }
    }
  }, [netBalance]);

  useEffect(() => {
    setPage(1);
  }, [expenses]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    const existing = JSON.parse(localStorage.getItem("expenses")) || [];
    const updated = existing.filter((e) => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setExpenses(updated);
    sendupdateexpense(Date.now());
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FastfoodIcon />;
      case "Travel":
        return <FlightIcon />;
      case "Entertainment":
        return <MovieIcon />;
      default:
        return null;
    }
  };

  const currentItems = expenses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box className={styles.container}>
      {expenses.length === 0 ? (
        <Typography>No recent transactions found</Typography>
      ) : (
        <>
          {currentItems.map((item) => (
            <Card key={item.id} className={styles.card}>
              <CardContent className={styles.cardContent}>
                <Box className={styles.itemLeft}>
                  {getCategoryIcon(item.category)}
                  <Box>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.date}
                    </Typography>
                  </Box>
                </Box>
                <Box className={styles.itemRight}>
                  <Typography className={styles.amount}>
                    ₹{item.price}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditExpenseId(item.id);
                      setEditExpenseOpen(true);
                    }}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Stack direction="row" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(expenses.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </>
      )}

      <Modal
        open={editExpenseOpen}
        onClose={() => {
          setEditExpenseOpen(false);
          setEditExpenseId("");
        }}
      >
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
          <EditExpenseForm
            netBalance={netBalance}
            editid={editExpenseId}
            onUpdate={() => {
              setEditExpenseOpen(false);
              const refreshed =
                JSON.parse(localStorage.getItem("expenses")) || [];
              setExpenses(refreshed);
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default RecentTransactions;
