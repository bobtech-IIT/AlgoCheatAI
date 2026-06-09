import { getPuterInstance, buildRefinePrompt, callPuterAI } from "./shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const puter = getPuterInstance(req);
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Missing required field: prompt" });
    }
    const refinedPrompt = buildRefinePrompt(prompt);
    const result = await callPuterAI(puter, refinedPrompt);

    return res.status(200).json(result);
  } catch (err) {
    console.error("API Refine Error:", err);
    return res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  }
}
