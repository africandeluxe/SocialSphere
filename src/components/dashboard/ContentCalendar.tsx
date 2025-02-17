'use client'
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { supabase } from '../../lib/supabaseClient';

interface ContentPlan {
  id: number;
  title: string;
  platform: string;
  date: string;
}

export default function ContentCalendar() {
  const [currentDate] = useState(new Date());
  const [contentList, setContentList] = useState<ContentPlan[]>([]);
  const [newContent, setNewContent] = useState({ title: '', platform: '' });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.from('content_plans').select('*');

        console.log('Data:', data);
        console.log('Error:', error);

        if (error) throw error;

        setContentList((data as ContentPlan[]) || []);
      } catch (err) {
        console.error('Error fetching content:', err);
      }
    };

    fetchContent();
  }, []);

  const addContent = async () => {
    if (!newContent.title || !newContent.platform || !selectedDate) return;

    try {
      const { data, error } = await supabase
        .from('content_plans')
        .insert([{ date: selectedDate, ...newContent }])
        .select();

      console.log('Inserted Data:', data);
      console.log('Insert Error:', error);

      if (error) throw error;

      if (data) {
        setContentList((prev) => [...prev, ...(data as ContentPlan[])]);
        setNewContent({ title: '', platform: '' });
        setSelectedDate(null);
      }
    } catch (err) {
      console.error('Error saving content:', err);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Content Planner</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <Calendar
            onChange={(date) => {
              if (date instanceof Date) {
                setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
              } else if (Array.isArray(date) && date[0] instanceof Date) {
                setSelectedDate(dayjs(date[0]).format('YYYY-MM-DD'));
              } else {
                setSelectedDate(null);
              }
            }}
            value={currentDate}
            tileContent={({ date }) =>
              contentList.some((item) => item.date === dayjs(date).format('YYYY-MM-DD')) ? (
                <div className="text-xs text-center text-brand-bronze">Planned</div>
              ) : null
            }/>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Add New Content</h2>
          <input type="text" placeholder="Title" value={newContent.title} onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            className="w-full p-2 border rounded-md mb-4"/>
          <select value={newContent.platform}
            onChange={(e) => setNewContent({ ...newContent, platform: e.target.value })}
            className="w-full p-2 border rounded-md mb-4">
            <option value="">Select Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
          </select>
          <button onClick={addContent}
            className="px-4 py-2 bg-brand-bronze text-white rounded-md hover:bg-brand-dark">Add Content
          </button>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Scheduled Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contentList.map((content) => (
            <div key={content.id} className="p-4 bg-gray-100 rounded-md shadow-md">
              <p className="font-bold">{content.title}</p>
              <p className="text-sm">{content.platform}</p>
              <p className="text-xs text-gray-600">{content.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}