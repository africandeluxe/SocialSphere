'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import PostModal from '../../../components/dashboard/PostModal'
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
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again.');
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
      console.error('Error deleting post:', err);
      setError('Failed to delete post. Please try again.');
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
      console.error('Error saving post:', err);
      setError('Failed to save post. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Content Management</h1>
      {error && <p className="text-red-500">{error}</p>}

      <button onClick={() => {
          setEditingPost(null);
          setModalOpen(true);
        }}
        className="mb-6 px-4 py-2 bg-brand-bronze text-white rounded hover:bg-opacity-90"
        >New Post
      </button>

      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow-md flex flex-col justify-between">
              <h3 className="text-lg font-bold text-brand-dark">{post.content}</h3>
              <p className="text-brand-gray mt-2">{post.likes} likes</p>
              <div className="mt-4 flex space-x-4">
                <button onClick={() => {
                    setEditingPost(post);
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                <button onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <PostModal post={editingPost}
          onClose={() => {
            setModalOpen(false);
            setEditingPost(null);
          }}
          onSave={handleSave}/>
      )}
    </DashboardLayout>
  );
}