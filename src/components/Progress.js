function Progress({
  questionNumber,
  numOfQuestions,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numOfQuestions}
        value={questionNumber + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{questionNumber + 1}</strong> / {numOfQuestions}
      </p>
      <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  );
}

export default Progress;
