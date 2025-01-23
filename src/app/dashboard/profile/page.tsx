'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    avatar_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw new Error(userError.message);
        }

        setProfile({
          name: userData?.user_metadata?.full_name || '',
          email: userData?.email || '',
          bio: userData?.user_metadata?.bio || '',
          avatar_url: userData?.user_metadata?.avatar_url || '',
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching profile:', err.message);
          setError('Failed to fetch profile information.');
        } else {
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const uploadAvatar = async () => {
    if (!file) return;

    try {
      const filePath = `avatars/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading avatar:', error.message);
        setError('Failed to upload profile picture.');
        return;
      }

      const publicUrl = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath).data.publicUrl;

      setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));
      return publicUrl;
    } catch (err) {
      console.error('Unexpected error during avatar upload:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      let avatarUrl = profile.avatar_url;
      if (file) {
        avatarUrl = await uploadAvatar();
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.name,
          bio: profile.bio,
          avatar_url: avatarUrl,
        },
      });

      if (error) {
        console.error('Error updating profile:', error.message);
        setError('Failed to update profile information.');
      } else {
        setSuccessMessage('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Unexpected error updating profile:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded shadow-lg max-w-lg md:max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address (Read-Only)
          </label>
          <input
            type="email"
            id="email"
            value={profile.email}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {profile.avatar_url && (
            <div className="mt-4 flex justify-center">
              <img
                src={profile.avatar_url}
                alt="Profile Avatar"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Connected Social Accounts</h2>
        {socialAccounts.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {socialAccounts.map((account, index) => (
              <li key={index} className="text-sm">
                <span className="font-medium">{account.platform}:</span> {account.username}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No social accounts connected.</p>
        )}
      </div>
    </div>
  );
}