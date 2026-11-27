import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { revealOnScroll, revealTransition } from "../motion";

interface Comment {
  id: number;
  nickname: string;
  message: string;
  date: string;
  userId: string;
}

function getUserId() {
  const key = "pohyu-user-id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const userId = "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
  localStorage.setItem(key, userId);
  return userId;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const deleteDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchComments() {
      try {
        const response = await fetch("/api/comments", { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load comments");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid comments response");
        if (!controller.signal.aborted) setComments(data);
      } catch {
        if (!controller.signal.aborted) setLoadError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void fetchComments();
    return () => controller.abort();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || loading || !nickname.trim() || !message.trim()) return;

    setSending(true);
    setSendError(false);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          message: message.trim(),
          userId: getUserId(),
        }),
      });
      if (!response.ok) throw new Error("Unable to post comment");

      const newComment = await response.json() as Comment;
      setComments((previous) => [newComment, ...previous]);
      setNickname("");
      setMessage("");
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setPassword("");
    setDeleteError("");
    deleteDialog.current?.showModal();
  };

  const handleDeleteConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deleteId === null || deleting) return;

    setDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId, password, userId: getUserId() }),
      });

      if (response.status === 403) {
        setDeleteError("Удалить комментарий может его автор или администратор.");
        return;
      }
      if (!response.ok) throw new Error("Unable to delete comment");

      deleteDialog.current?.close();
      setComments((previous) => previous.filter((comment) => comment.id !== deleteId));
    } catch {
      setDeleteError("Не удалось удалить комментарий. Попробуй ещё раз.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section id="comments" aria-labelledby="comments-title" tabIndex={-1} className="section-shell comments-section">
      <SectionHeading id="comments-title" label="Chat" title="Comments" index="06" />

      <motion.form {...revealOnScroll} onSubmit={handleSubmit} className="comment-form">
        <label className="form-label" htmlFor="comment-nickname">Твой ник</label>
        <input
          id="comment-nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          maxLength={30}
          required
          readOnly={sending}
        />
        <label className="form-label" htmlFor="comment-message">Твой комментарий</label>
        <textarea
          id="comment-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          maxLength={500}
          required
          readOnly={sending}
        />
        <div className="comment-form-footer">
          <span className="char-count" aria-hidden="true">{message.length} / 500</span>
          <button type="submit" disabled={sending || loading || !nickname.trim() || !message.trim()} className="primary-button">
            <span>{sending ? "Отправляю…" : "Отправить"}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
              <path d="M5 12h14m-5-5 5 5-5 5" />
            </svg>
          </button>
        </div>
        {sendError && <p className="form-error" role="alert">Не удалось отправить комментарий. Попробуй ещё раз.</p>}
      </motion.form>

      {loading && <p className="comment-feedback" role="status">Загрузка…</p>}
      {loadError && <p className="comment-feedback" role="status">Не удалось загрузить комментарии. Обнови страницу, чтобы попробовать ещё раз.</p>}
      {!loading && !loadError && comments.length === 0 && (
        <p className="comment-feedback">Пока нет комментариев. Будь первым!</p>
      )}

      <ul className="comment-list">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.li
              key={comment.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, transition: { duration: 0.25 } }}
              transition={revealTransition}
              className="comment-item"
            >
              <div className="comment-meta">
                <span className="comment-avatar" aria-hidden="true">{[...comment.nickname.trim()][0]?.toUpperCase() ?? "?"}</span>
                <strong>{comment.nickname}</strong>
                <span>{comment.date}</span>
                <button type="button" disabled={deleting} onClick={() => handleDeleteClick(comment.id)}>Удалить</button>
              </div>
              <p>{comment.message}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <dialog
        ref={deleteDialog}
        className="site-dialog comment-dialog"
        aria-labelledby="delete-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <form onSubmit={handleDeleteConfirm} className="comment-form">
          <h3 id="delete-title">Удалить комментарий?</h3>
          <label className="form-label" htmlFor="comment-password">Пароль администратора (если комментарий чужой)</label>
          <input
            id="comment-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {deleteError && <p className="form-error" role="alert">{deleteError}</p>}
          <div className="dialog-actions">
            <button type="submit" disabled={deleting}>{deleting ? "Удаляю…" : "Удалить"}</button>
            <button type="button" onClick={() => deleteDialog.current?.close()}>Отмена</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
