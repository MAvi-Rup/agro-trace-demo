import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { date: "2022-03-01", productionRate: 150 },
  { date: "2022-03-02", productionRate: 300 },
  { date: "2022-03-03", productionRate: 250 },
  { date: "2022-03-04", productionRate: 400 },
  { date: "2022-03-05", productionRate: 350 },
  { date: "2022-03-06", productionRate: 500 },
  { date: "2022-03-07", productionRate: 450 }
];


const TobaccoProductionChart = () => {
  return (
    <div style={{marginLeft:'150px'}}>
        <ResponsiveContainer width="75%" height={400} >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="productionRate" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default TobaccoProductionChart;
