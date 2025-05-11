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
        name="title"
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        name="price"
        label="Price"
        variant="outlined"
        fullWidth
        type="number"
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

<FormControl fullWidth margin="normal">
  <InputLabel htmlFor="category">Category</InputLabel>
  <select
    name="category"
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      fontSize: "16px",
      marginTop: "8px",
    }}
  >
    <option value="">Select Category</option>
    <option value="Food">Food</option>
    <option value="Travel">Travel</option>
    <option value="Entertainment">Entertainment</option>
  </select>
</FormControl>



      <TextField
        name="date"
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
