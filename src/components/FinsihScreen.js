function FinsihScreen({ points, maxPoints, highScore }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage <= 80 && percentage < 100) emoji = "😊";
  else if (percentage <= 50 && percentage < 80) emoji = "🤐";
  else if (percentage > 0 && percentage < 50) emoji = "😣";
  else if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You Scored <strong>{points}</strong> Out Of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">
        HighScore: {highScore},
        <strong>
          {highScore == 0
            ? "New Record !"
            : points < highScore
            ? "You Did Better Last Time"
            : "New Record !"}
        </strong>
      </p>
    </>
  );
}

export default FinsihScreen;
