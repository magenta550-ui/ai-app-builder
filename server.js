import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';

config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const SYSTEM_PROMPT = `You are an expert frontend developer AI assistant that builds web applications.

When the user describes an app they want, you MUST:
1. Briefly explain what you'll build (1-2 sentences)
2. Generate a COMPLETE, SELF-CONTAINED HTML file with inline CSS and JavaScript
3. Wrap the HTML code in a \`\`\`html code block

Rules for generated code:
- Must be a single HTML file (no external dependencies except CDN links)
- Use modern CSS (flexbox, grid, gradients, transitions)
- Use vanilla JavaScript (no frameworks)
- Make it visually polished with a dark or modern theme
- Make it fully interactive and functional
- Always include <!DOCTYPE html> and proper structure
- You may use CDN links for libraries like Chart.js, Three.js, etc.

If the user asks for modifications, update the FULL HTML and return the complete file again.
Always respond in the same language the user writes in.`;

app.post('/api/chat', async (req, res) => {
  const { messages, apiKey } = req.body;

  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(400).json({ error: 'API key required. Set ANTHROPIC_API_KEY or provide apiKey.' });
  }

  const client = new Anthropic({ apiKey: key });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
