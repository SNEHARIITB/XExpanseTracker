import React, { useState, useEffect }from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// const data = [
//   { name: "Entertainment", value: 70 },
//   { name: "Food", value: 30 },
//   { name: "Travel", value: 10 },
// ];

const COLORS = ["#3f51b5", "#3f51b5", "#3f51b5"]; // Material Blue

const getCategoryData = (expenses) => {
  const categoryMap = {
    Food: 0,
    Travel: 0,
    Entertainment: 0,
  };

  expenses.forEach((exp) => {
    if (Object.prototype.hasOwnProperty.call(categoryMap, exp.category)) {
      categoryMap[exp.category] += parseFloat(exp.price); // make sure price is numeric
    }
  });

  return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
};

const TopExpensesBarChart = () => {
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
  }, []);
  return (
    <Box sx={{height: "100%"}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
          barCategoryGap="20%"
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 10, 10]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopExpensesBarChart;
