import { useEffect, useReducer } from "react";
import questionsFromFile from "../questions.js"; // To Ignore Fake API

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinsihScreen from "./FinsihScreen";
import Restart from "./Restart";
import Footer from "./Footer";
import Timer from "./Timer";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        answers: Array.from({ length: action.payload.length }, () => null),
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const currentQuestion = state.questions[state.curQuestion];
      const isTherePoints = currentQuestion.correctOption === action.payload;
      const point = isTherePoints ? currentQuestion.points : 0;
      return {
        ...state,
        answers: state.answers.map((value, i) =>
          i === state.curQuestion ? action.payload : value
        ),
        points: state.points + point,
      };
    case "next":
      return { ...state, curQuestion: state.curQuestion + 1 };
    case "prev":
      return { ...state, curQuestion: state.curQuestion - 1 };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
        status: "ready",
        questions: state.questions,
        answers: Array.from({ length: state.questions.length }, () => null),
      };
    case "tick":
      return {
        ...state,
        status: "finished",
      };
    default:
      throw new Error("An Action Is Unkown");
  }
}

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished', 'timeout'
  status: "loading",
  curQuestion: 0,
  answers: [],
  points: 0,
  highScore: 0,
};

const SEC = 900;

function App() {
  const [
    { questions, status, curQuestion, answers, points, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    // When Active Fake API
    // async function fetchQuestions() {
    //   try {
    //     const req = await fetch("http://localhost:8080/questions");
    //     const data = await req.json();
    //     console.log(data);
    //     dispatch({ type: "dataReceived", payload: data });
    //   } catch (err) {
    //     console.log(err);
    //     dispatch({ type: "dataFailed" });
    //   }
    // }
    // fetchQuestions();
    dispatch({ type: "dataReceived", payload: questionsFromFile });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={questions.length}
            onStart={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              questionNumber={curQuestion}
              numOfQuestions={questions.length}
              points={points}
              totalPoints={questions.reduce((acc, cur) => acc + cur.points, 0)}
              answer={answers[curQuestion]}
            />
            <Question
              question={questions[curQuestion]}
              onSelectAnswer={dispatch}
              answer={answers[curQuestion]}
            />
            <Footer>
              <div className="btn-group">
                <PreviousButton curQuestion={curQuestion} onPrev={dispatch} />
                <NextButton
                  onClickNext={dispatch}
                  answer={answers[curQuestion]}
                  curQuestion={curQuestion}
                  numOfQuestions={questions.length}
                />
              </div>
              <Timer onTick={dispatch} sec={SEC} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinsihScreen
              points={points}
              maxPoints={questions.reduce((acc, cur) => acc + cur.points, 0)}
              highScore={highScore}
            />
            <Restart onRestart={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
