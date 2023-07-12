import { useReducer } from "react";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";

const initialState = {
  questions: [],
};

function reducer(state, action) {}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions } = state;

  return (
    <div className="app">
      <Header />

      <StartScreen />
    </div>
  );
}

export default App;
