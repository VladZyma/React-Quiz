import { useReducer } from "react";

import useQuestions from "./hooks/useQuestions";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Wrong action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions } = state;

  useQuestions(dispatch);

  return (
    <div className="app">
      <Header />

      <StartScreen />
    </div>
  );
}

export default App;
