import { getPuterInstance, buildGeneratePrompt, callPuterAI } from "./shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const puter = getPuterInstance(req);

    const { type, topic } = req.body;
    if (!type || !topic) {
      return res.status(400).json({ message: "Missing required fields: type and topic" });
    }
    const prompt = buildGeneratePrompt(type, topic);
    const result = await callPuterAI(puter, prompt);
    
    return res.status(200).json(result);
  } catch (err) {
    console.error("API Generate Error:", err);
    return res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  }
}
