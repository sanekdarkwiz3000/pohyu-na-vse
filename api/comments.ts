export default async function handler(req: any, res: any) {
  // Хардкодим на время проверки
  const KV_URL = "https://probable-finch-169314.upstash.io";
  const KV_TOKEN = "gQAAAAAAApViAAIgcDFjZmM0ZmJkNjBiODA0MzBlODE1YzVlNzQ0NzYzOTg2Mw";

  if (req.method === "GET") {
    const response = await fetch(`${KV_URL}/get/pohyu-comments`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const data = await response.json();
    const comments = data.result ? JSON.parse(data.result) : [];
    return res.status(200).json(Array.isArray(comments) ? comments : []);
  }

  if (req.method === "POST") {
    const { nickname, message } = req.body;
    const getRes = await fetch(`${KV_URL}/get/pohyu-comments`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const getData = await getRes.json();
    let comments = [];
    if (getData.result) {
      const parsed = JSON.parse(getData.result);
      comments = Array.isArray(parsed) ? parsed : [];
    }
    comments.unshift({
      id: Date.now(),
      nickname: nickname.slice(0, 30),
      message: message.slice(0, 500),
      date: new Date().toLocaleString("ru-RU"),
    });

    await fetch(`${KV_URL}/set/pohyu-comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(comments),
    });

    return res.status(201).json(comments[0]);
  }

  return res.status(405).json({ error: "Method not allowed" });
}