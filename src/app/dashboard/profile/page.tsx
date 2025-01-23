'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Profile {
  name: string;
  email: string;
  bio: string;
  avatar_url: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    bio: '',
    avatar_url: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw new Error(userError.message);

        setProfile({
          name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          bio: user?.user_metadata?.bio || '',
          avatar_url: user?.user_metadata?.avatar_url || '',
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile information.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const uploadAvatar = async (): Promise<string | null> => {
    if (!file) return null;

    try {
      const filePath = `avatars/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('avatars').upload(filePath, file);

      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      if (!data) throw new Error('Failed to retrieve public URL for avatar.');

      return data.publicUrl;
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('An unexpected error occurred while uploading the avatar.');
      return null;
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      let avatarUrl = profile.avatar_url;

      if (file) {
        const uploadedAvatarUrl = await uploadAvatar();
        if (uploadedAvatarUrl) avatarUrl = uploadedAvatarUrl;
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.name,
          bio: profile.bio,
          avatar_url: avatarUrl,
        },
      });

      if (error) throw new Error(error.message);

      setSuccessMessage('Profile updated successfully!');
      setFile(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile information. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input type="text" id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address (Read-Only)
          </label>
          <input type="email" id="email" value={profile.email} readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"/>
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea id="bio"  value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={4}></textarea>
        </div>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input type="file" id="avatar" accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500"/>
          {profile.avatar_url && (
            <div className="mt-4 flex justify-center">
              <img src={profile.avatar_url} alt="Profile Avatar" className="w-24 h-24 rounded-full shadow-md"/>
            </div>
          )}
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Update Profile
        </button>
      </form>
    </div>
  );
}