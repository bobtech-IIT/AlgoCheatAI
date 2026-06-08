export default function handler(req, res) {
  // Return whether the backend has a direct OpenAI API key or Puter developer token configured.
  // If true, the frontend can query Vercel backend.
  // If false, the frontend falls back directly to browser-side Puter.js.
  const openAIKey = process.env.OPENAI_API_KEY;
  const hasValidOpenAIKey = !!(openAIKey && openAIKey.trim().startsWith("sk-"));
  const puterAuthToken = process.env.PUTER_AUTH_TOKEN;
  const hasValidPuterToken = !!(puterAuthToken && puterAuthToken.trim().length > 0);

  return res.status(200).json({
    hasOpenAIKey: hasValidOpenAIKey || hasValidPuterToken
  });
}
