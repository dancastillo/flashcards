import React from 'react';
import { IFlashcard } from '../types';
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }: { flashcards: IFlashcard[] }) {
  return (
    <>
      {flashcards?.length === 0 && <h1>No flashcards found. Lets add some flashcards....</h1>}
      <div className="card-grid">
        {flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
    </>
  );
}
