import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: number;
  nickname: string;
  message: string;
  date: string;
}

const STORAGE_KEY = "pohyu-na-vse-comments";

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(() => {
    // Загружаем при первой инициализации
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  // Сохраняем при каждом изменении comments
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      nickname: nickname.trim(),
      message: message.trim(),
      date: new Date().toLocaleString("ru-RU"),
    };

    setComments((prev) => [newComment, ...prev]);
    setNickname("");
    setMessage("");
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section id="comments" className="mx-auto max-w-3xl px-8 py-32">
      <h2 className="mb-4 text-sm uppercase tracking-[0.5em] text-violet-400">
        Chat
      </h2>
      <h3 className="mb-16 text-6xl font-black">
        COMMENTS
      </h3>

      {/* Форма */}
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

      {/* Комментарии */}
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

      {comments.length === 0 && (
        <p className="text-center text-zinc-500">Пока нет комментариев. Будь первым!</p>
      )}
    </section>
  );
}