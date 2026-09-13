import { useState, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Welcome from "./pages/Welcome.jsx";
import Assessment from "./pages/Assessment.jsx";
import Result from "./pages/Result.jsx";
import TransitionVeil from "./components/TransitionVeil.jsx";
import { INITIAL_FORM_STATE } from "./constants.js";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [result, setResult] = useState(null);
  const [isVeiled, setIsVeiled] = useState(false);

  // Every cross-page journey passes through the same brief veil so the
  // app feels like one continuous space rather than separate documents.
  const travelTo = useCallback(
    (path) => {
      setIsVeiled(true);
      window.setTimeout(() => {
        navigate(path);
        window.setTimeout(() => setIsVeiled(false), 60);
      }, 520);
    },
    [navigate]
  );

  const resetJourney = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setResult(null);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome onBegin={() => travelTo("/assessment")} />} />
          <Route
            path="/assessment"
            element={
              <Assessment
                formData={formData}
                setFormData={setFormData}
                onComplete={(res) => {
                  setResult(res);
                  travelTo("/result");
                }}
                onExit={() => travelTo("/")}
              />
            }
          />
          <Route
            path="/result"
            element={
              <Result
                result={result}
                formData={formData}
                onRestart={() => {
                  resetJourney();
                  travelTo("/assessment");
                }}
                onHome={() => {
                  resetJourney();
                  travelTo("/");
                }}
              />
            }
          />
        </Routes>
      </AnimatePresence>
      <TransitionVeil active={isVeiled} />
    </>
  );
}
