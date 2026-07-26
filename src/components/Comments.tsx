import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: number;
  nickname: string;
  message: string;
  date: string;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load comments:", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !message.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          message: message.trim(),
        }),
      });
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setNickname("");
      setMessage("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <section id="comments" className="mx-auto max-w-3xl px-8 py-32">
      <h2 className="mb-4 text-sm uppercase tracking-[0.5em] text-violet-400">
        Chat
      </h2>
      <h3 className="mb-16 text-6xl font-black">
        COMMENTS
      </h3>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
      >
        <input
          type="text"
          placeholder="Твой ник"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={30}
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-violet-500/40"
        />
        <textarea
          placeholder="Твой комментарий..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          maxLength={500}
          className="mb-4 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-violet-500/40"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl border border-violet-500/40 px-8 py-3 font-semibold transition hover:bg-violet-500/10"
        >
          Отправить
        </motion.button>
      </motion.form>

      {loading ? (
        <p className="text-center text-zinc-500">Загрузка...</p>
      ) : (
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="group mb-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-violet-400">{comment.nickname}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-500">{comment.date}</span>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-xs text-zinc-600 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <p className="text-zinc-300">{comment.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {!loading && comments.length === 0 && (
        <p className="text-center text-zinc-500">Пока нет комментариев. Будь первым!</p>
      )}
    </section>
  );
}