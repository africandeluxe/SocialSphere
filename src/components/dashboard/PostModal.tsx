'use client'
import { useState, useEffect } from 'react';
interface Post {
  id?: number;
  content: string;
  likes?: number;
}
interface PostModalProps {
  post: Post | null; 
  onClose: () => void;
  onSave: (post: Post) => void;
}

export default function PostModal({ post, onClose, onSave }: PostModalProps) {
  const [content, setContent] = useState(post?.content || '');

  useEffect(() => {
    setContent(post?.content || '');
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      alert('Content cannot be empty');
      return;
    }

    onSave({ id: post?.id, content: trimmedContent });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      aria-labelledby="post-modal-title" role="dialog" aria-modal="true">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 id="post-modal-title" className="text-lg sm:text-xl font-bold mb-4 text-center">
          {post ? 'Edit Post' : 'New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="content"
              className="block text-sm sm:text-base font-medium text-gray-700">Content</label>
            <input type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm sm:text-base"
              placeholder="Enter post content..." required/>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <button type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition text-sm sm:text-base">Cancel</button>
            <button type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm sm:text-base">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}