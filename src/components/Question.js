import Options from "./Options";
function Question({ question, onSelectAnswer, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        onSelectAnswer={onSelectAnswer}
        answer={answer}
        correctOption={question.correctOption}
      />
    </div>
  );
}

export default Question;
