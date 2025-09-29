import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { mockDB, Species } from "./mockDB";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SpeciesDistributionChart(): JSX.Element {
  const data: Species[] = mockDB.species;

  return (
    <div>
      <h3>Species Distribution</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
