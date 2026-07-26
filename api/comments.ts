import { Redis } from "@upstash/redis";

interface Comment {
  id: number;
  nickname: string;
  message: string;
  date: string;
}

const redis = Redis.fromEnv();
const COMMENTS_KEY = "pohyu-comments";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const data = await redis.get<string>(COMMENTS_KEY);
    const comments: Comment[] = data ? JSON.parse(data) : [];
    return res.status(200).json(comments);
  }

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

    const data = await redis.get<string>(COMMENTS_KEY);
    const comments: Comment[] = data ? JSON.parse(data) : [];
    comments.unshift(newComment);
    await redis.set(COMMENTS_KEY, JSON.stringify(comments));

    return res.status(201).json(newComment);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const data = await redis.get<string>(COMMENTS_KEY);
    const comments: Comment[] = data ? JSON.parse(data) : [];
    const filtered = comments.filter((c) => c.id !== id);
    await redis.set(COMMENTS_KEY, JSON.stringify(filtered));
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}