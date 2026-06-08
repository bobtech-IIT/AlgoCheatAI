export default function handler(req, res) {
  // Force backend proxy routing so we can run Cerebras serverless without CORS/login popups on mobile
  return res.status(200).json({
    hasOpenAIKey: true
  });
}
