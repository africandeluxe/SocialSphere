'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

interface Post {
  id: number;
  content: string;
  likes: number;
  created_at: string;
}

export default function ContentManagementPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setPosts(data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching posts:', err.message);
          setError('Failed to load posts. Please try again.');
        } else {
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error deleting post:', err.message);
        setError('Failed to delete post. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleSave = async (post: { id?: number; content: string }) => {
    try {
      let response;
      if (post.id) {
        response = await supabase
          .from('posts')
          .update({ content: post.content })
          .eq('id', post.id);
      } else {
        response = await supabase
          .from('posts')
          .insert({ content: post.content });
      }

      if (response.error) throw response.error;

      setModalOpen(false);
      setEditingPost(null);

      const { data: updatedPosts, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPosts(updatedPosts || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error saving post:', err.message);
        setError('Failed to save post. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Content Management</h1>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => setModalOpen(true)}
        className="mb-6 px-4 py-2 bg-brand-bronze text-white rounded hover:bg-opacity-90"
      >
        New Post
      </button>

      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded shadow-md flex flex-col justify-between"
            >
              <h3 className="text-lg font-bold text-brand-dark">{post.content}</h3>
              <p className="text-brand-gray mt-2">{post.likes} likes</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <PostModal
          post={editingPost}
          onClose={() => {
            setModalOpen(false);
            setEditingPost(null);
          }}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}

function PostModal({
  post,
  onClose,
  onSave,
}: {
  post?: { id: number; content: string };
  onClose: () => void;
  onSave: (post: { id?: number; content: string }) => void;
}) {
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: post?.id, content });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{post ? 'Edit Post' : 'New Post'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}