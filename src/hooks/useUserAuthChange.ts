"use client";

import { useLocalScores } from "./useLocalScores";
import { migrateUserScores } from "@/lib/migrateUserScores";

export function useUserAuthChange(userId: string) {
  const { localScores, setLocalScores } = useLocalScores();
  console.log(
    `current user id: ${userId === "" ? "nobody logged in" : userId}`,
  );
  console.log(
    `The cached scores are: ${localScores.length === 0 ? "No cached scores" : localScores}`,
  );

  if (userId === "" || !localScores) return;

  const handleNewUser = async () => {
    try {
      const { success, message } = await migrateUserScores(userId, localScores);
      if (success) {
        setLocalScores([]);
      }
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  handleNewUser();
}
