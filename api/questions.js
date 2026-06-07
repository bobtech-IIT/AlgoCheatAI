import { getPuterInstance, buildContextQuestionsPrompt, callPuterAI } from "./shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const puter = getPuterInstance(req);

    const { type, topic, detectedName } = req.body;
    if (!type || !topic || !detectedName) {
      return res.status(400).json({ message: "Missing required fields: type, topic, and detectedName" });
    }
    const prompt = buildContextQuestionsPrompt(type, topic, detectedName);
    const result = await callPuterAI(puter, prompt);
    
    return res.status(200).json(result);
  } catch (err) {
    console.error("API Questions Error:", err);
    return res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  }
}
