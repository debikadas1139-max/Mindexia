export const GENDER_OPTIONS = ["Male", "Female"];

export const COUNTRY_OPTIONS = [
  "India",
  "USA",
  "Canada",
  "Australia",
  "UK",
  "Germany",
  "Mexico",
  "Turkey",
  "France",
  "Other",
];

export const ACADEMIC_LEVEL_OPTIONS = [
  "Undergraduate",
  "Graduate",
  "High School",
];

export const PLATFORM_OPTIONS = [
  "Facebook",
  "LinkedIn",
  "Instagram",
  "Snapchat",
  "Twitter",
  "YouTube",
  "TikTok",
  "LINE",
  "KakaoTalk",
  "VKontakte",
  "WhatsApp",
  "WeChat",
];

export const PURPOSE_OPTIONS = ["Networking", "Education", "Entertainment", "News"];

export const STRESS_OPTIONS = [
  {
    value: "Low",
    description: "Steady. Things generally feel manageable.",
  },
  {
    value: "Medium",
    description: "Some pressure, but you're keeping pace.",
  },
  {
    value: "High",
    description: "Frequently stretched thin or on edge.",
  },
  {
    value: "Very High",
    description: "Consistently overwhelmed most days.",
  },
];

export const INITIAL_FORM_STATE = {
  age: 21,
  gender: "",
  country: "",
  academicLevel: "",
  platform: "",
  purpose: "",
  avgDailyUsageHours: 4,
  dailyUnlocks: 80,
  studyHours: 4,
  physicalActivityHours: 1,
  sleepHours: 7,
  stressLevel: "",
};
