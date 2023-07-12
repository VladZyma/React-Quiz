import { useReducer } from "react";

import useQuestions from "./hooks/useQuestions";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";

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
    default:
      throw new Error("Wrong action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer } = state;

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
        <Question
          question={questions.at(index)}
          dispatch={dispatch}
          answer={answer}
        />
      )}
    </div>
  );
}

export default App;
