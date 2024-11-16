"use client";

import { useEffect } from "react";
import { useLocalScores } from "./useLocalScores";
import { migrateUserScores } from "@/lib/migrateUserScores";

export function useUserAuthChange(userId: string) {
  const { localScores, setLocalScores } = useLocalScores();

  useEffect(() => {
    const handleNewUser = async () => {
      const { success, message } = await migrateUserScores(userId, localScores);
      if (success) {
        setLocalScores([]);
      }
      console.log(message);
    };

    handleNewUser();
  }, [userId]);
}
