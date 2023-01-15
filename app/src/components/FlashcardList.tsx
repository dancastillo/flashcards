import React, { useEffect, useState } from 'react';
import { IFlashcard } from '../types';
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }: { flashcards: IFlashcard[] }) {
  const [flashcardsArr, setFlashcardsArr] = useState<IFlashcard[]>([]);

  useEffect(() => {
    flashcards.sort(() => 0.5 - Math.random());
    setFlashcardsArr(flashcards);
  }, [flashcards]);

  return (
    <>
      {flashcardsArr?.length === 0 && <h1>No flashcards found. Lets add some flashcards....</h1>}
      <div className="card-grid">
        {flashcardsArr.map((flashcard: IFlashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
    </>
  );
}
