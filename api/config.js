export default function handler(req, res) {
  // Return true if any key/token is configured on the Vercel backend to route traffic through serverless proxy
  return res.status(200).json({
    hasOpenAIKey: !!(process.env.CEREBRAS_API_KEY || process.env.OPENAI_API_KEY || process.env.PUTER_AUTH_TOKEN)
  });
}
