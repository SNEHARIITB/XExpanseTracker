import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const EditExpenseForm = ({onUpdate,netBalance,editid}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(Date.now());


useEffect(() => {
  if (!editid) return;

  const existing = JSON.parse(localStorage.getItem("expenses")) || [];
  const filtered = existing.find((e) => e.id === editid);
  setTitle(filtered.title);
    setPrice(filtered.price);
    setCategory(filtered.category);
    setDate(filtered.date);
    setId(editid);


}, [editid]);

    const handleSubmit = () => {
    if (netBalance < parseFloat(price)) {
        alert("You Cannot Spend Any More");
        return;
    }

    if (!title || !price || !category || !date) {
        alert("Please fill all fields");
        return;
    }

    const newExpense = {
        id,
        title,
        price: parseFloat(price),
        category,
        date,
    };

    let existing = JSON.parse(localStorage.getItem("expenses")) || [];

    if (editid) {
        // Update existing expense
        existing = existing.map((e) => (e.id === editid ? newExpense : e));
    } else {
        // Add new expense
        existing.push(newExpense);
    }

    localStorage.setItem("expenses", JSON.stringify(existing));

    onUpdate(); // Close modal or refresh view

    // Reset form
    setId(Date.now());
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
    };


  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add Expenses
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        type="number"
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Expense
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setTitle("");
            setPrice("");
            setCategory("");
            setDate("");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditExpenseForm;
