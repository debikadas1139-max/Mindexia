import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Logo from "../components/Logo.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import StepContainer from "../components/StepContainer.jsx";
import SelectField from "../components/SelectField.jsx";
import SliderField from "../components/SliderField.jsx";
import NumberField from "../components/NumberField.jsx";
import PlatformSelector from "../components/PlatformSelector.jsx";
import StressSelector from "../components/StressSelector.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import {
  GENDER_OPTIONS,
  COUNTRY_OPTIONS,
  ACADEMIC_LEVEL_OPTIONS,
  PURPOSE_OPTIONS,
} from "../constants.js";
import { predictMentalHealth, ApiError } from "../services/api.js";

const TOTAL_STEPS = 4;

function validateStep(step, form) {
  const errors = {};
  if (step === 1) {
    if (!form.age || form.age < 10 || form.age > 100) errors.age = "Enter an age between 10 and 100.";
    if (!form.gender) errors.gender = true;
    if (!form.country) errors.country = true;
    if (!form.academicLevel) errors.academicLevel = true;
  }
  if (step === 2) {
    if (!form.platform) errors.platform = true;
    if (!form.purpose) errors.purpose = true;
    if (form.dailyUnlocks < 0) errors.dailyUnlocks = "Daily unlocks can't be negative.";
  }
  if (step === 4) {
    if (!form.stressLevel) errors.stressLevel = true;
  }
  return errors;
}

export default function Assessment({ formData, setFormData, onComplete, onExit }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState("");

  const set = (key) => (val) => setFormData((f) => ({ ...f, [key]: val }));

  function goNext() {
    const stepErrors = validateStep(step, formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      submit();
    }
  }

  function goBack() {
    if (step === 1) {
      onExit();
      return;
    }
    setDirection(-1);
    setErrors({});
    setStep((s) => s - 1);
  }

  async function submit() {
    setStatus("loading");
    try {
      const result = await predictMentalHealth(formData);
      onComplete(result);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof ApiError
          ? err.message
          : "Something unexpected interrupted the assessment."
      );
    }
  }

  const isStepValid = Object.keys(validateStep(step, formData)).length === 0;

  return (
    <motion.main
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-screen overflow-hidden bg-ink-900 px-6 py-10"
    >
      <AnimatedBackground variant="quiet" />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col">
        <div className="mb-10 flex items-center justify-between">
          <Logo size="sm" />
          <span className="text-xs text-mist-400">Mental Health Assessment</span>
        </div>

        {status !== "loading" && (
          <div className="mb-10">
            <ProgressBar current={step} />
          </div>
        )}

        <div className="rounded-2xl border border-mist-400/10 bg-ink-800/40 p-6 backdrop-blur sm:p-8">
          {status === "loading" && <LoadingScreen />}

          {status === "error" && (
            <div className="flex flex-col items-center gap-5 py-8 text-center">
              <p className="font-display text-xl text-mist-100">
                We couldn't reach Mindexia's prediction engine.
              </p>
              <p className="max-w-xs text-sm text-mist-400">
                Make sure the FastAPI server is running at the configured address, then try again.
                {errorMessage ? ` (${errorMessage})` : ""}
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  submit();
                }}
                className="flex items-center gap-2 rounded-full bg-signal-violet px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                <RotateCcw size={14} />
                Try again
              </button>
            </div>
          )}

          {status === "idle" && (
            <AnimatePresence mode="wait" custom={direction}>
              <StepContainer stepKey={step} direction={direction}>
                {step === 1 && (
                  <fieldset className="space-y-5">
                    <legend className="mb-1 font-display text-xl text-mist-100">About you</legend>
                    <NumberField
                      label="Age"
                      value={formData.age}
                      onChange={set("age")}
                      min={10}
                      max={100}
                      error={errors.age}
                    />
                    <SelectField
                      label="Gender"
                      value={formData.gender}
                      onChange={set("gender")}
                      options={GENDER_OPTIONS}
                    />
                    <SelectField
                      label="Country"
                      value={formData.country}
                      onChange={set("country")}
                      options={COUNTRY_OPTIONS}
                    />
                    <SelectField
                      label="Academic level"
                      value={formData.academicLevel}
                      onChange={set("academicLevel")}
                      options={ACADEMIC_LEVEL_OPTIONS}
                    />
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset className="space-y-6">
                    <legend className="mb-1 font-display text-xl text-mist-100">Your digital world</legend>
                    <div>
                      <p className="mb-2.5 text-sm text-mist-300">Most used platform</p>
                      <PlatformSelector value={formData.platform} onChange={set("platform")} />
                    </div>
                    <SelectField
                      label="Purpose of use"
                      value={formData.purpose}
                      onChange={set("purpose")}
                      options={PURPOSE_OPTIONS}
                    />
                    <SliderField
                      label="Daily social media usage"
                      value={formData.avgDailyUsageHours}
                      onChange={set("avgDailyUsageHours")}
                      min={0}
                      max={24}
                      step={0.1}
                      lowLabel="Barely"
                      highLabel="Constant"
                    />
                    <NumberField
                      label="Daily phone unlocks"
                      value={formData.dailyUnlocks}
                      onChange={set("dailyUnlocks")}
                      min={0}
                      max={500}
                      step={5}
                      error={errors.dailyUnlocks}
                    />
                  </fieldset>
                )}

                {step === 3 && (
                  <fieldset className="space-y-7">
                    <legend className="mb-1 font-display text-xl text-mist-100">Your daily rhythm</legend>
                    <SliderField
                      label="Study hours"
                      value={formData.studyHours}
                      onChange={set("studyHours")}
                      min={0}
                      max={24}
                      step={0.1}
                      lowLabel="Light"
                      highLabel="Intense"
                    />
                    <SliderField
                      label="Physical activity"
                      value={formData.physicalActivityHours}
                      onChange={set("physicalActivityHours")}
                      min={0}
                      max={24}
                      step={0.1}
                      lowLabel="Sedentary"
                      highLabel="Very active"
                    />
                    <SliderField
                      label="Sleep per night"
                      value={formData.sleepHours}
                      onChange={set("sleepHours")}
                      min={0}
                      max={24}
                      step={0.1}
                      lowLabel="Restless"
                      highLabel="Restful"
                    />
                  </fieldset>
                )}

                {step === 4 && (
                  <fieldset className="space-y-5">
                    <legend className="mb-1 font-display text-xl text-mist-100">Your stress</legend>
                    <p className="text-sm text-mist-400">
                      How would you describe your current stress level?
                    </p>
                    <StressSelector value={formData.stressLevel} onChange={set("stressLevel")} />
                    <p className="pt-2 text-xs leading-relaxed text-mist-400">
                      This assessment provides an AI-generated score based on the information you
                      provide. It is not a medical diagnosis.
                    </p>
                  </fieldset>
                )}
              </StepContainer>
            </AnimatePresence>
          )}
        </div>

        {status === "idle" && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-mist-300 transition-colors hover:text-mist-100"
            >
              <ArrowLeft size={15} />
              Back
            </button>
            <button
              onClick={goNext}
              disabled={!isStepValid}
              className="flex items-center gap-2 rounded-full bg-mist-100 px-6 py-3 text-sm font-medium text-ink-950 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:scale-105 enabled:hover:shadow-glow"
            >
              {step === TOTAL_STEPS ? (
                <>
                  Reveal My Score
                  <Sparkles size={15} />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
}
