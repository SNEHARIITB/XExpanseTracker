import React, { useState } from "react";
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

const AddExpenseForm = ({onUpdate,netBalance}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(Date.now());

  const handleSubmit = () => {
    if(netBalance < parseFloat(price)){
      alert("You Cannot Expand Any More")
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

    const existing = JSON.parse(localStorage.getItem("expenses")) || [];
    localStorage.setItem("expenses", JSON.stringify([...existing, newExpense]));

    // Reset form
    onUpdate();
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
        name="Title"
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        name="Price"
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
          name="Category"
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
        name="Date"
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
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

export default AddExpenseForm;
