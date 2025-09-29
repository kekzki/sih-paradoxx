import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { mockDB, BiomassRecord } from "./mockDB";

export default function BiomassChart(): JSX.Element {
  const data: BiomassRecord[] = mockDB.biomass;

  return (
    <div>
      <h3>Monthly Biomass</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="biomass" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
