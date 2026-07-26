export default async function handler(req: any, res: any) {
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.status(500).json({ error: "Missing KV_URL or KV_TOKEN" });
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(`${KV_URL}/get/pohyu-comments`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
      const data = await response.json();
      const comments = data.result ? JSON.parse(data.result) : [];
      return res.status(200).json(Array.isArray(comments) ? comments : []);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { nickname, message } = req.body;

      if (!nickname || !message) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const getRes = await fetch(`${KV_URL}/get/pohyu-comments`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
      const getData = await getRes.json();
      
      let comments = [];
      if (getData.result) {
        const parsed = JSON.parse(getData.result);
        comments = Array.isArray(parsed) ? parsed : [];
      }

      const newComment = {
        id: Date.now(),
        nickname: nickname.slice(0, 30),
        message: message.slice(0, 500),
        date: new Date().toLocaleString("ru-RU"),
      };

      comments.unshift(newComment);

      await fetch(`${KV_URL}/set/pohyu-comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.stringify(comments)),
      });

      return res.status(201).json(newComment);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const getRes = await fetch(`${KV_URL}/get/pohyu-comments`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
      const getData = await getRes.json();
      let comments = [];
      if (getData.result) {
        const parsed = JSON.parse(getData.result);
        comments = Array.isArray(parsed) ? parsed : [];
      }
      comments = comments.filter((c: any) => c.id !== id);

      await fetch(`${KV_URL}/set/pohyu-comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.stringify(comments)),
      });

      return res.status(200).json({ success: true });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}