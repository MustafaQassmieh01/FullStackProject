import React from "react";

/**
 * CircleProgress - a simple SVG circular progress indicator
 * @param {number} value - percentage value (0-100)
 * @param {string} color - stroke color
 * @param {string} label - label to show in center
 * @param {number} size - diameter in px
 */
const CircleProgress = ({ value = 0, color = "#3b82f6", label = "", size = 64 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="block mx-auto">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={8}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size / 5}
        fill="#374151"
        fontWeight="bold"
      >
        {label}
      </text>
    </svg>
  );
};

export default CircleProgress;
