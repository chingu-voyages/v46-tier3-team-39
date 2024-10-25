"use client";
import React, { useState } from "react";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
export default function SingleQuestion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="bg-white">
      <article className="flex items-center justify-between p-4 lg:p-6">
        <h2
          className="cursor-pointer"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {question}
        </h2>
        <ul>
          {!showAnswer && (
            <li>
              <button onClick={() => setShowAnswer(true)}>
                <Add />
              </button>
            </li>
          )}
          {showAnswer && (
            <li>
              <button onClick={() => setShowAnswer(false)}>
                <Remove />
              </button>
            </li>
          )}
        </ul>
      </article>

      <article className={`${showAnswer && "p-4 lg:p-6"}`}>
        {showAnswer && <p>{answer}</p>}
      </article>
    </div>
  );
}
