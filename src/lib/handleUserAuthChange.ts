import { migrateUserScores } from "./migrateUserScores";

export const handleUserAuthChange = async (
  userId: string,
  localScores: number[],
  setLocalScores: (value: number[] | ((prev: number[]) => number[])) => void,
) => {
  if (userId === "" || localScores.length === 0) return;
  try {
    const { message } = await migrateUserScores(userId, localScores);
    console.log(message);
  } catch (error) {
    console.log(error);
  }

  setLocalScores([]);
};
