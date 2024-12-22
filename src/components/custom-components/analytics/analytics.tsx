"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Target, TrendingDown, Trash } from "lucide-react";
import { UserContext } from "@/contexts/userContext";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { deleteUserScore } from "@/lib/deleteUserScore";
import { useLocalScores } from "@/hooks/useLocalScores";
// import { handleNewUser, useUserAuthChange } from "@/hooks/useUserAuthChange";
import { handleUserAuthChange } from "@/lib/handleUserAuthChange";

export default function Analytics() {
  const userId = useContext(UserContext);
  const { localScores, setLocalScores } = useLocalScores();

  const scoreQueryResult = useQuery(
    api.getUserScores.getUserScores,
    userId ? { clerkUserId: userId } : "skip",
  );

  const userScores = scoreQueryResult?.scores ?? localScores;

  useEffect(() => {
    handleUserAuthChange(userId, localScores, setLocalScores);
  }, [userId]);

  useEffect(() => {
    calculateStats();
  }, [userScores]);

  const [stats, setStats] = useState({
    highest: 0,
    mean: 0,
    lowest: 0,
  });

  const calculateStats = useCallback(() => {
    if (!userScores?.length) return;

    const scores = userScores.map((score) => score);
    setStats({
      highest: Math.max(...scores),
      mean: scores.reduce((a, b) => a + b, 0) / scores.length,
      lowest: Math.min(...scores),
    });
  }, [userScores]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Your Zetamax Progress
          </CardTitle>
          <CardDescription className="text-indigo-200">
            Performance overview across quizzes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Highest Score</p>
                <p className="text-2xl font-bold text-white">{stats.highest}</p>
              </div>
              <Trophy className="text-yellow-400" size={24} />
            </div>
            <div className="bg-white/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Mean Score</p>
                <p className="text-2xl font-bold text-white">
                  {stats.mean.toFixed(2)}
                </p>
              </div>
              <Target className="text-green-400" size={24} />
            </div>
            <div className="bg-white/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Lowest Score</p>
                <p className="text-2xl font-bold text-white">{stats.lowest}</p>
              </div>
              <TrendingDown className="text-red-400" size={24} />
            </div>
            <button
              className="bg-white/20 opacity-50 rounded-lg p-4 flex items-center justify-center hover:opacity-100 transition-opacity"
              onClick={() => deleteUserScore(userId)}
            >
              <Trash className="text-red-400" size={24} />
            </button>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userScores}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="index"
                  stroke="rgba(255,255,255,0.5)"
                  label={{
                    value: "Quiz Number",
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
                  formatter={(value) => [`Score: ${value}`]}
                  labelFormatter={(label) => `Quiz ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey={(data) => data}
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ fill: "#8884d8", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
