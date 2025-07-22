import axios from 'axios';

interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

export async function sendPromptToOpenAI(promptText: string): Promise<string> {
  try {
    const response = await axios.post<OpenAIResponse>('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: promptText }],
      max_tokens: 1000,        // תשובות ארוכות יותר
      temperature: 0.7,        // יצירתיות מתונה
      presence_penalty: 0.1,   // מגוון בתשובות
      frequency_penalty: 0.1   // הימנעות מחזרה
    }, {
      headers: { 
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Error calling OpenAI:', error.response?.data || error.message);
    throw new Error(`OpenAI API Error: ${error.response?.data?.error?.message || error.message}`);
  }
}
