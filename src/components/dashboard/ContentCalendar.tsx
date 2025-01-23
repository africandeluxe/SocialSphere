'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import dayjs from 'dayjs';
import { supabase } from '../../lib/supabaseClient';

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [contentList, setContentList] = useState([]);
  const [newContent, setNewContent] = useState({ title: '', platform: '' });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from('content_plans').select('*');
      if (error) console.error('Error fetching content:', error);
      else setContentList(data);
    };

    fetchContent();
  }, []);

  // Save new content to Supabase
  const addContent = async () => {
    if (newContent.title && newContent.platform && selectedDate) {
      const { data, error } = await supabase
        .from('content_plans')
        .insert([{ date: selectedDate, ...newContent }]);
      if (error) console.error('Error saving content:', error);
      else {
        setContentList([...contentList, data[0]]);
        setNewContent({ title: '', platform: '' });
        setSelectedDate(null);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-brand-dark text-center sm:text-left">
        Content Planner
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar */}
        <div className="w-full lg:w-1/2">
          <Calendar
            onChange={(date) => setSelectedDate(dayjs(date).format('YYYY-MM-DD'))}
            value={currentDate}
            tileContent={({ date }) =>
              contentList.find((item) => item.date === dayjs(date).format('YYYY-MM-DD')) ? (
                <div className="text-xs text-center text-brand-bronze">Planned</div>
              ) : null
            }
            className="w-full"
          />
        </div>

        {/* Content Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center lg:text-left">
            Plan Content
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={newContent.title}
            onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            className="p-2 border border-gray-300 rounded-md mb-2 w-full"
          />
          <select
            value={newContent.platform}
            onChange={(e) => setNewContent({ ...newContent, platform: e.target.value })}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          >
            <option value="">Select Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
          </select>
          <button
            onClick={addContent}
            className="bg-brand-bronze text-white px-4 py-2 rounded-md hover:bg-brand-dark transition"
          >
            Add Content
          </button>
        </div>
      </div>

      {/* Display Content */}
      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          Scheduled Content
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contentList.map((content) => (
            <div
              key={content.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-md"
            >
              <div>
                <p className="text-sm font-bold">{content.title}</p>
                <p className="text-xs text-gray-600">{content.platform}</p>
              </div>
              <p className="text-xs text-gray-500">{content.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}