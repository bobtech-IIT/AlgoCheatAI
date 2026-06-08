function getMockEmbedding(text) {
  const vector = new Array(1536).fill(0);
  const clean = text.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const words = clean.split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    vector[0] = 1.0;
    return vector;
  }

  for (const word of words) {
    // Deterministic hash to map word to index [0, 1535]
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash * 31 + word.charCodeAt(i)) % 1536;
    }
    vector[hash] += 1;
  }

  // Normalize the vector so cosine similarity equals dot product
  let sumSq = 0;
  for (let i = 0; i < 1536; i++) {
    sumSq += vector[i] * vector[i];
  }
  const magnitude = Math.sqrt(sumSq);
  for (let i = 0; i < 1536; i++) {
    vector[i] = vector[i] / magnitude;
  }

  return vector;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { texts } = req.body;
    if (!texts || !Array.isArray(texts)) {
      return res.status(400).json({ message: "Missing required parameter: texts (array of strings)" });
    }

    const openAIKey = process.env.OPENAI_API_KEY;

    if (openAIKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/embeddings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openAIKey}`,
          },
          body: JSON.stringify({
            input: texts,
            model: "text-embedding-3-small",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const embeddings = data.data.map(item => item.embedding);
          return res.status(200).json({ embeddings, model: "text-embedding-3-small" });
        }
        console.warn(`OpenAI Embeddings returned error ${response.status}. Falling back to mock.`);
      } catch (err) {
        console.warn("OpenAI Embeddings request failed, falling back to mock:", err);
      }
    }

    // Fallback: Generate mock bag-of-words embeddings
    const embeddings = texts.map(t => getMockEmbedding(t));
    return res.status(200).json({ embeddings, model: "mock-bag-of-words" });
  } catch (err) {
    console.error("API Embed Error:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
}
