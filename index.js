const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
apiKey: process.env.ANTHROPIC_API_KEY,
});

// Route de test (pour vérifier si le site répond)
app.get('/', (req, res) => res.send("Serveur Study-AI en ligne !"));

app.post('/api/chat', async (req, res) => {
try {
const { messages, system } = req.body;
const response = await anthropic.messages.create({
model: "claude-3-5-sonnet-20240620",
max_tokens: 2000,
system: system,
messages: messages,
});
res.json({ content: response.content[0].text });
} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
