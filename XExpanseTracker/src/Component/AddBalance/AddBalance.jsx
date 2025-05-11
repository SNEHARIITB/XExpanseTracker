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

const AddBalanceForm = () => {
  const [balance, setBalance] = useState("");

  const handleSubmit = () => {
    if (!balance) {
        alert("Please fill all fields");
        return;
      }
    
      const parsedBalance = parseFloat(balance);
    
      if (isNaN(parsedBalance)) {
        alert("Please enter a valid number");
        return;
      }
    
      localStorage.setItem("balance", JSON.stringify(parsedBalance));
      setBalance("");

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
        Add Balance 
      </Typography>

      <TextField
        label="Balance"
        variant="outlined"
        fullWidth
        type="number"
        margin="normal"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Balance
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setBalance("");

          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddBalanceForm;
