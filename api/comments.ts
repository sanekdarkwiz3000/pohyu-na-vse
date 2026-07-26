interface Comment {
  id: number;
  nickname: string;
  message: string;
  date: string;
}

const COMMENTS_KEY = "pohyu-comments";

export default async function handler(req: any, res: any) {
  const KV_URL = process.env.KV_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.status(500).json({ error: "KV not configured" });
  }

  const headers = {
    Authorization: `Bearer ${KV_TOKEN}`,
    "Content-Type": "application/json",
  };

  // GET
  if (req.method === "GET") {
    const response = await fetch(`${KV_URL}/get/${COMMENTS_KEY}`, { headers });
    const data = await response.json();
    const comments: Comment[] = data.result ? JSON.parse(data.result) : [];
    return res.status(200).json(comments);
  }

  // POST
  if (req.method === "POST") {
    const { nickname, message } = req.body;
    if (!nickname || !message) {
      return res.status(400).json({ error: "Nickname and message required" });
    }

    const newComment: Comment = {
      id: Date.now(),
      nickname: nickname.trim().slice(0, 30),
      message: message.trim().slice(0, 500),
      date: new Date().toLocaleString("ru-RU"),
    };

    // Получаем текущие
    const getRes = await fetch(`${KV_URL}/get/${COMMENTS_KEY}`, { headers });
    const getData = await getRes.json();
    const comments: Comment[] = getData.result ? JSON.parse(getData.result) : [];
    comments.unshift(newComment);

    // Сохраняем
    await fetch(`${KV_URL}/set/${COMMENTS_KEY}`, {
      method: "POST",
      headers,
      body: JSON.stringify(JSON.stringify(comments)),
    });

    return res.status(201).json(newComment);
  }

  // DELETE
  if (req.method === "DELETE") {
    const { id } = req.body;
    const getRes = await fetch(`${KV_URL}/get/${COMMENTS_KEY}`, { headers });
    const getData = await getRes.json();
    const comments: Comment[] = getData.result ? JSON.parse(getData.result) : [];
    const filtered = comments.filter((c) => c.id !== id);

    await fetch(`${KV_URL}/set/${COMMENTS_KEY}`, {
      method: "POST",
      headers,
      body: JSON.stringify(JSON.stringify(filtered)),
    });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}