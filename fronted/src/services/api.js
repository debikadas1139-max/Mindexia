// Centralized API configuration.
// Change VITE_API_BASE_URL in a .env file to point at a different backend
// without touching any component code.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Shapes the assessment form state into the exact payload the FastAPI
 * /predict endpoint expects. Field names and casing must match the
 * Pydantic model on the backend precisely.
 */
export function buildPredictionPayload(form) {
  return {
    age: Number(form.age),
    gender: form.gender,
    country: form.country,
    academic_level: form.academicLevel,
    most_used_platform: form.platform,
    purpose_of_use: form.purpose,
    avg_daily_usage_hours: Number(form.avgDailyUsageHours),
    daily_unlocks: Number(form.dailyUnlocks),
    study_hours: Number(form.studyHours),
    physical_activity_hours: Number(form.physicalActivityHours),
    sleep_hours_per_night: Number(form.sleepHours),
    stress_level: form.stressLevel,
  };
}

export async function predictMentalHealth(form) {
  const payload = buildPredictionPayload(form);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    // fetch throws for network-level failures (server not running, CORS, DNS, etc.)
    throw new ApiError(
      "unreachable",
      "We couldn't reach Mindexia's prediction engine."
    );
  }

  if (!response.ok) {
    throw new ApiError(
      "rejected",
      "The prediction engine couldn't process this assessment."
    );
  }

  const data = await response.json();

  if (typeof data?.predicted_mental_health_score !== "number") {
    throw new ApiError(
      "malformed",
      "The prediction engine returned an unexpected response."
    );
  }

  return data;
}

export class ApiError extends Error {
  constructor(kind, message) {
    super(message);
    this.kind = kind;
  }
}
