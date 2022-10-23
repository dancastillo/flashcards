import React, { useEffect, useRef, useState } from 'react';
import { IFlashcard } from '../types';
import '../index.css';

export default function Flashcard({ flashcard }: { flashcard: IFlashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState(100);

  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);

  function setMaxHeight() {
    const frontHeight = frontEl.current!.getBoundingClientRect().height;
    const backHeight = frontEl.current!.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div className={`card ${flip ? 'flip' : ''}`} style={{ height }} onClick={() => setFlip(!flip)}>
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard">
          {flashcard.options?.map((option) => (
            <div className="flashcard-option" key={option}>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}
