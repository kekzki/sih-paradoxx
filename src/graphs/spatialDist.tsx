import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { mockDB, LocationRecord } from "./mockDB";

export default function SpatialDistributionChart(): JSX.Element {
  const data: LocationRecord[] = mockDB.locations;

  return (
    <div>
      <h3>Spatial Distribution</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="density" fill="#ffc658" />
      </BarChart>
    </div>
  );
}
