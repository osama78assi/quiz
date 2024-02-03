function StartScreen({ numberOfQuestions, onStart }) {
  return (
    <div className="start">
      <h2>Welcome To React Quiz!</h2>
      <h3>{numberOfQuestions} Questions To Test Your React Mastery</h3>
      <button className="btn btn-ui" onClick={() => onStart({ type: "start" })}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
