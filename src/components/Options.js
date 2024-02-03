function Options({ options, onSelectAnswer, answer, correctOption }) {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={answer !== null}
          onClick={() => onSelectAnswer({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
