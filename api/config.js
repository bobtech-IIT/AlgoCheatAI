export default function handler(req, res) {
  // Return whether the backend has a direct OpenAI API key configured.
  // If true, the frontend can query Vercel backend.
  // If false, the frontend falls back directly to browser-side Puter.js to avoid REST forbidden errors.
  return res.status(200).json({
    hasOpenAIKey: !!process.env.OPENAI_API_KEY
  });
}
