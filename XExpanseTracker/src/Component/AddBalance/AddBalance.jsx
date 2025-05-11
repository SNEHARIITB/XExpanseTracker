import React, {  useState } from "react";
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

const AddBalanceForm = ({onUpdate}) => {
  const [balance, setBalance] = useState("");
  //console.log("expensesbalance!!!:",expensesbalance)

  const handleSubmit = () => {
    if (!balance) {
        alert("Please fill all fields");
        return;
      }     
      const localbalance = localStorage.getItem("balance") || 0;

      const parsedBalance = parseFloat(balance) + parseFloat(localbalance);
    
      if (isNaN(parsedBalance)) {
        alert("Please enter a valid number");
        return;
      }
    
      localStorage.setItem("balance", JSON.stringify(parsedBalance));
      setBalance("");
      onUpdate()

  };
  //useEffect(()=>handleSubmit,[]);

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
        name="Balance"
        label="Balance"
        variant="outlined"
        fullWidth
        type="number"
        margin="normal"
        value={balance}
        inputProps={{ min: 0 }}
        placeholder = "Income Amount"
        onChange={(e) => setBalance(e.target.value)}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Add Balance
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            onUpdate();
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
