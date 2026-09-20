export default async function handler(req: any, res: any) {
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.status(500).json({ error: "Missing config" });
  }

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
      userId: req.body.userId || "",
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

  if (req.method === "DELETE") {
    const { id, password, userId } = req.body;
    const ADMIN_PASSWORD = "sany2012$$";

    const getRes = await fetch(`${KV_URL}/get/pohyu-comments`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const getData = await getRes.json();
    let comments = [];
    if (getData.result) {
      const parsed = JSON.parse(getData.result);
      comments = Array.isArray(parsed) ? parsed : [];
    }

    const comment = comments.find((c: any) => c.id === id);
    
    // Проверка: либо правильный пароль, либо свой коммент (userId совпадает)
    if (password !== ADMIN_PASSWORD && (!comment || comment.userId !== userId)) {
      return res.status(403).json({ 
        error: "Сорян но система комментов тут немного кривая, что бы удалить коммент обратитесь к саньке ^^" 
      });
    }

    comments = comments.filter((c: any) => c.id !== id);

    await fetch(`${KV_URL}/set/pohyu-comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(comments),
    });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}