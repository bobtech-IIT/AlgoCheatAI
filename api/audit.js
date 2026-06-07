import { getPuterInstance, buildAuditPrompt, callPuterAI } from "./shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const puter = getPuterInstance(req);

    const { type, content, imageDescription } = req.body;
    if (!type || !content) {
      return res.status(400).json({ message: "Missing required fields: type and content" });
    }
    const prompt = buildAuditPrompt(type, content, imageDescription);
    const result = await callPuterAI(puter, prompt);
    
    return res.status(200).json(result);
  } catch (err) {
    console.error("API Audit Error:", err);
    return res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  }
}
