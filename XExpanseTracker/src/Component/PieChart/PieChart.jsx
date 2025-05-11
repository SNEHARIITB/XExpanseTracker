import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Typography, Box } from "@mui/material";
import styles from "./PieChart.module.css";

const COLORS = ["#9B30FF", "#FFA500", "#FFD700"]; // Purple, Orange, Yellow

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const getCategoryData = (expenses) => {
  const categoryMap = {
    Food: 0,
    Travel: 0,
    Entertainment: 0,
  };

  expenses.forEach((exp) => {
    if (Object.prototype.hasOwnProperty.call(categoryMap, exp.category)) {
      categoryMap[exp.category] += parseFloat(exp.price); 
    }
  });

  return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
};

const ExpensePieChart = ({netBalance}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const localdata = localStorage.getItem("expenses");
    if (localdata) {
      try {
        const parsed = JSON.parse(localdata);
        const grouped = getCategoryData(parsed);
        setChartData(grouped);
      } catch (err) {
        console.error("Error parsing localStorage data:", err);
      }
    }
  }, [netBalance]);

  return (
    <Box className={styles.container}>

      <PieChart width={400} height={300} className={styles.piechart}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          labelLine={false}
          label={renderCustomizedLabel}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </Box>
  );
};

export default ExpensePieChart;
