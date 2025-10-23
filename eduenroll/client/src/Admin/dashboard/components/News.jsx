import React from 'react';

/**
 * News component - shows a list of news items.
 * Accepts `items` prop so you can later pass API data: [{ title, summary, date }]
 */
const News = ({ items = null }) => {
  // default placeholder items (Lorem ipsum)
  const defaultItems = [
    { title: 'Welcome to EduEnroll', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '2025-10-16' },
    { title: 'New Courses Added', summary: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '2025-10-10' },
    { title: 'Maintenance Notice', summary: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', date: '2025-10-01' },
  ];

  const list = items && Array.isArray(items) ? items : defaultItems;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">News</h3>
      <div className="space-y-3">
        {list.map((it, i) => (
          <article key={i} className="border rounded p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{it.title}</h4>
              <div className="text-xs text-gray-500">{it.date}</div>
            </div>
            <p className="text-sm text-gray-700">{it.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;
