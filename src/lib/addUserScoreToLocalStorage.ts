"use client";

function addUserScoreToLS(score: number) {
  const prevScores: number[] = JSON.parse(
    localStorage.getItem("scores") ?? "[]",
  );
  localStorage.setItem("scores", JSON.stringify([...prevScores, score]));
}
