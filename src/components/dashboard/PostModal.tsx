'use client';

import { useState } from 'react';

export default function PostModal({
  post,
  onClose,
  onSave,
}: {
  post?: { id: number; content: string; likes: number };
  onClose: () => void;
  onSave: (post: { id?: number; content: string }) => void;
}) {
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: post?.id, content });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
          {post ? 'Edit Post' : 'New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="content"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Content
            </label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm sm:text-base"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm sm:text-base"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}