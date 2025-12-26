"use client";

import {
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashCard from "@/components/admin/components/cards/dash-card";

const multiLineData = [
  { name: "January", series1: 800, series2: 900 },
  { name: "February", series1: 750, series2: 850 },
  { name: "March", series1: 900, series2: 2000 },
  { name: "April", series1: 700, series2: 1900 },
  { name: "May", series1: 1100, series2: 1500 },
  { name: "June", series1: 950, series2: 1600 },
  { name: "July", series1: 1050, series2: 1400 },
  { name: "August", series1: 1200, series2: 1800 },
  { name: "September", series1: 1100, series2: 1700 },
  { name: "October", series1: 1300, series2: 1600 },
  { name: "November", series1: 1400, series2: 2000 },
  { name: "December", series1: 1600, series2: 2100 },
];

const MultiLineChart = () => {
  return (
    <DashCard cardTitle={`Active Users By Comparison`}>
      <ResponsiveContainer width="100%" height={"100%"}>
        <ComposedChart data={multiLineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="series1"
            stroke="#34C759"
            dot={{ fill: "#34C759", r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="series2"
            stroke="#0088FF"
            dot={{ fill: "#0088FF", r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </DashCard>
  );
};

export default MultiLineChart;
