export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Only POST requests allowed' });
    }
  
    const { message, style } = req.body;
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: "system", content: style },
          { role: "user", content: `用户说：“${message}”。你必须反对。` }
        ],
        temperature: 0.85,
      }),
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  