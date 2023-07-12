import { useEffect } from "react";

function useQuestions(dispatch) {
  useEffect(() => {
    const controller = new AbortController();

    async function fetchQuestions() {
      try {
        const resp = await fetch("http://localhost:8000/questions", {
          signal: controller.signal,
        });

        if (!resp.ok) {
          throw new Error("Response not OK!");
        }

        const data = await resp.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();

    return () => controller.abort();
  }, [dispatch]);
}

export default useQuestions;
