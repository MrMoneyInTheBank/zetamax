"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ScoreChart = ({ userScores }: { userScores: number[] }) => {
  const chartData = userScores.map((score, index) => ({
    index: index + 1,
    score: score,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="index"
          stroke="rgba(255,255,255,0.5)"
          label={{
            value: "Game Number",
            position: "insideBottom",
            offset: -15,
            fill: "rgba(255,255,255,0.5)",
          }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.5)"
          label={{
            value: "Score",
            angle: -90,
            position: "insideLeft",
            fill: "rgba(255,255,255,0.5)",
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
          }}
          labelStyle={{ color: "#aaa" }}
          formatter={(value) => [
            <div key="tooltip-content">
              <div>Score: {value}</div>
              <div>Time per question: {`${(120 / +value).toFixed(2)}s`}</div>
            </div>,
          ]}
          labelFormatter={(label) => `Game ${label}`}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ fill: "#8884d8", strokeWidth: 2 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
