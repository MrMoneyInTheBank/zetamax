"use client";

import { useState, useEffect, useContext, useCallback } from "react";
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
import { handleUserAuthChange } from "@/lib/handleUserAuthChange";
import { ScoreChart } from "./chart";

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
      highest: Math.round(Math.max(...scores)),
      mean: scores.reduce((a, b) => a + b, 0) / scores.length,
      lowest: Math.round(Math.min(...scores)),
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
            Scaled performance overview across quizzes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6 text-md sm:text-2xl">
            <div className="bg-white/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Highest Score</p>
                <p className="font-bold text-white">{stats.highest}</p>
              </div>
              <Trophy className="text-yellow-400" size={24} />
            </div>
            <div className="bg-white/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Mean Score</p>
                <p className="font-bold text-white">{stats.mean.toFixed(2)}</p>
              </div>
              <Target className="text-green-400" size={24} />
            </div>
            <div className="bg-white/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Lowest Score</p>
                <p className="font-bold text-white">{stats.lowest}</p>
              </div>
              <TrendingDown className="text-red-400" size={24} />
            </div>
            <button
              className="bg-white/20 opacity-50 rounded-lg p-4 flex items-center justify-center hover:opacity-100 transition-opacity"
              onClick={() => {
                deleteUserScore(userId);
                setLocalScores([]);
              }}
            >
              <Trash className="text-red-400" size={24} />
            </button>
          </div>

          <div className="h-[320px]">
            <ScoreChart userScores={userScores} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
