import React, { useState } from "react";

// Simple Tailwind-styled calendar component that shows current month and highlights today
const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthMatrix(year, month) {
  // returns a 2D array of weeks, each week is 7 elements (date numbers or null)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = [];
  let week = Array(7).fill(null);
  let dayCounter = 1;

  for (let i = firstDay; i < 7; i++) {
    week[i] = dayCounter++;
  }
  weeks.push(week);

  while (dayCounter <= daysInMonth) {
    week = Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
  }

  return weeks;
}

const Calendar = ({ onDayClick, events = [] }) => {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selected, setSelected] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const weeks = getMonthMatrix(view.year, view.month);
  // map events by date string YYYY-MM-DD
  const eventsByDate = events.reduce((acc, ev) => {
    const d = new Date(ev.date);
    if (Number.isNaN(d.getTime())) return acc;
    const key = d.toISOString().slice(0, 10);
    acc[key] = acc[key] || [];
    acc[key].push(ev);
    return acc;
  }, {});

  const prevMonth = () => {
    const m = view.month - 1;
    if (m < 0) setView({ year: view.year - 1, month: 11 });
    else setView({ ...view, month: m });
  };
  const nextMonth = () => {
    const m = view.month + 1;
    if (m > 11) setView({ year: view.year + 1, month: 0 });
    else setView({ ...view, month: m });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="px-2 py-1 rounded hover:bg-gray-100">◀</button>
        <div className="text-center">
          <div className="font-semibold text-gray-800">
            {new Date(view.year, view.month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
          </div>
          <div className="text-sm text-gray-500">Today: {today.toDateString()}</div>
        </div>
        <button onClick={nextMonth} className="px-2 py-1 rounded hover:bg-gray-100">▶</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-600">
        {daysShort.map(d => (
          <div key={d} className="font-medium py-1">{d}</div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1 text-center">
        {weeks.flat().map((d, idx) => {
          const isToday = d === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear();
          const dateObj = d ? new Date(view.year, view.month, d) : null;
          const key = dateObj ? dateObj.toISOString().slice(0, 10) : null;
          const hasEvents = key && eventsByDate[key] && eventsByDate[key].length > 0;
          const isSelected = selected && key === selected.toISOString().slice(0, 10);
          return (
            <div
              key={idx}
              onClick={() => {
                if (!d) return;
                const clicked = new Date(view.year, view.month, d);
                setSelected(clicked);
                if (onDayClick) onDayClick(clicked);
              }}
              className={`h-14 flex flex-col items-center justify-center text-sm cursor-pointer rounded ${d ? 'hover:bg-gray-100' : ''} ${isToday ? 'bg-blue-100 text-blue-700 font-semibold' : ''} ${isSelected ? 'ring-2 ring-blue-300' : ''}`}
            >
              <div className="flex-1">{d || ''}</div>
              <div className="h-2">
                {hasEvents && <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* events list for selected date */}
      <div className="mt-3">
        <div className="text-sm font-medium mb-1">Events on {selected.toDateString()}</div>
        <div className="space-y-1">
          {(eventsByDate[selected.toISOString().slice(0, 10)] || []).map((ev, i) => (
            <div key={i} className="p-2 bg-gray-50 rounded border">
              <div className="text-sm font-semibold">{ev.title}</div>
              {ev.time && <div className="text-xs text-gray-500">{ev.time}</div>}
            </div>
          ))}
          {((eventsByDate[selected.toISOString().slice(0, 10)] || []).length === 0) && (
            <div className="text-xs text-gray-500">No events</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
