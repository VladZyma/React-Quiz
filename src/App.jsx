import { useReducer } from "react";

import useQuestions from "./hooks/useQuestions";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Footer from "./components/Footer";
import NextButton from "./components/NextButton";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    default:
      throw new Error("Wrong action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer } = state;

  const numQuestions = questions.length;

  useQuestions(dispatch);

  return (
    <div className="app">
      <Header />

      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen dispatch={dispatch} questions={questions} />
      )}
      {status === "active" && (
        <>
          <Question
            question={questions.at(index)}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </Footer>
        </>
      )}
    </div>
  );
}

export default App;
