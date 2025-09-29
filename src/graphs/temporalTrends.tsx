import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { mockDB, TrendRecord } from "./mockDB";

export default function TemporalTrendsChart(): JSX.Element {
  const data: TrendRecord[] = mockDB.trends;

  return (
    <div>
      <h3>Temporal Trends</h3>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
