function NextButton({ onClickNext, answer, curQuestion, numOfQuestions }) {
  if (curQuestion < numOfQuestions - 1) {
    return (
      <button
        disabled={answer === null}
        className="btn btn-ui"
        onClick={() => onClickNext({ type: "next" })}
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        disabled={answer === null}
        className="btn btn-ui"
        onClick={() => onClickNext({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
