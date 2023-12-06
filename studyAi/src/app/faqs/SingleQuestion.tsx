"use client";
import React, { useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { string } from "zod";

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
                <BsPlusLg />
              </button>
            </li>
          )}
          {showAnswer && (
            <li>
              <button onClick={() => setShowAnswer(false)}>
                <BiMinus />
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
