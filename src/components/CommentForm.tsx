import { useState } from "react";
import { createComment } from "../apis/comment";

interface CommentFormProps {
  postId: string;
  onSuccess?: () => void;
}

const CommentForm = ({ postId, onSuccess }: CommentFormProps) => {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createComment({ nickname, content, postId: Number(postId) });
      setNickname("");
      setContent("");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError("댓글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-8">
      <div>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <textarea
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          rows={3}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
      >
        {loading ? "작성 중..." : "댓글 작성"}
      </button>
    </form>
  );
};

export default CommentForm;
