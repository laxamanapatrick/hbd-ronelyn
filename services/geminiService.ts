
import { GoogleGenAI, Type } from "@google/genai";

const DEFAULT_GREETING = {
  title: "Happy Birthday Ronelyn!",
  summary: "QA Test Results: 100% Success. Another year of perfect deployments.",
  details: [
    "Zero regressions found in the last 365-day sprint.",
    "Happiness automation scripts running at 100% capacity.",
    "User Acceptance Testing (UAT) passed: You are officially the best.",
    "Security Patch: Joy and health levels hardened for the new version."
  ],
  conclusion: "Deployment to Birthday Party successful. Status: STABLE."
};

export const getRonelynGreeting = async () => {
  const apiKey = process.env.API_KEY;

  // If no API key is provided, don't even try to call the API
  // This makes it "easy to deploy" without environment variables
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.warn("No API Key detected. Using high-quality default greeting.");
    return DEFAULT_GREETING;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a witty, professional, and heartfelt birthday greeting for a female QA Analyst named Ronelyn. Use QA terminology like 'sprints', 'test cycles', 'zero defects', 'automation scripts', and 'user acceptance'. The tone should be celebratory and fun. Output as JSON with fields: 'title', 'summary', 'details' (array of strings), and 'conclusion'.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            details: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            conclusion: { type: Type.STRING }
          },
          required: ["title", "summary", "details", "conclusion"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API error, falling back to default:", error);
    return DEFAULT_GREETING;
  }
};
