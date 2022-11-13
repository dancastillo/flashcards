import React, { useEffect, useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IFlashcard } from '../types';
import '../index.css';
import EditModal from './EditModal';

export default function Flashcard({ flashcard }: { flashcard: IFlashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState(100);
  const [useModal, setUseModal] = useState(false);

  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);

  function setMaxHeight() {
    const frontHeight = frontEl.current!.getBoundingClientRect().height;
    const backHeight = frontEl.current!.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  function editItem() {
    setTimeout(() => setFlip(false));
    setUseModal(true);
  }

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <>
      {useModal && <EditModal show={useModal} close={() => setUseModal(false)} flashcard={flashcard} />}
      <div className={`card ${flip ? 'flip' : ''}`} style={{ height }} onClick={() => setFlip(!flip)}>
        <FaEdit className="front-edit" onClick={() => editItem()} />
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
    </>
  );
}
