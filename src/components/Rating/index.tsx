"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function Rating() {
  const [rating, setRating] = useState(0);
  const [hoveredElement, setHoveredElement] = useState(0);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={currentRating}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
              className="hidden"
            />
            <Star
              className={`h-5 w-5 cursor-pointer text-yellow-600 ${
                currentRating <= (hoveredElement || rating)
                  ? "fill-yellow-600"
                  : ""
              }`}
              onMouseEnter={() => setHoveredElement(currentRating)}
              onMouseLeave={() => setHoveredElement(0)}
            />
          </label>
        );
      })}
    </div>
  );
}
