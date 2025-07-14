// openaiService.js
import axios from 'axios';

export async function sendPromptToOpenAI(promptText) {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: promptText }]
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  });
  return response.data.choices[0].message.content;
}