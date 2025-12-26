"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

import menuIcon from "@/public/icons/menu.svg";

import Image from "next/image";
import DashCard from "@/components/admin/components/cards/dash-card";

const lineChartData = [
  { name: "May", value: 14000 },
  { name: "Jun", value: 15200 },
  { name: "Jul", value: 16800 },
  { name: "Aug", value: 18200 },
  { name: "Sep", value: 19500 },
  { name: "Oct", value: 20800 },
  { name: "Nov", value: 21200 },
];

const areaChartData = [
  { name: "Monthly", value: 200 },
  { name: "Quarterly", value: 150 },
  { name: "Annually", value: 100 },
  { name: "Biennially", value: 180 },
  { name: "Triennially", value: 250 },
  { name: "Lifetime", value: 2800 },
];

const LineChartComp = () => {
  return (
    <>
      {/* Line Chart */}

      <DashCard cardTitle={`Active Users By Year-Month`}>
        <ResponsiveContainer minWidth={0}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "none",
                color: "#fff",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#C40000"
              dot={{ fill: "#C40000", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashCard>

      {/* Area Chart */}
      <DashCard cardTitle={`Active Users By Product BillingCycle`}>
        <ResponsiveContainer>
          <AreaChart data={areaChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "none",
                color: "#fff",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#C40000"
              fill="#C40000"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashCard>
    </>
  );
};

export default LineChartComp;
