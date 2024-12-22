import { migrateUserScores } from "./migrateUserScores";

export const handleUserAuthChange = async (
  userId: string,
  localScores: number[],
  setLocalScores: (value: number[] | ((prev: number[]) => number[])) => void,
) => {
  if (userId === "" || localScores.length === 0) return;
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
