import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function ComplaintChart({ pending, resolved }) {

  const data = [
    { name: "Pending", value: pending },
    { name: "Resolved", value: resolved }
  ];

  const COLORS = ["#f59e0b", "#22c55e"];

  return (

    <ResponsiveContainer width="100%" height={300}>

      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >

          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}

        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </ResponsiveContainer>

  );

}

export default ComplaintChart;