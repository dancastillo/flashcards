import React from 'react';
import { IFlashcard } from '../types';
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }: { flashcards: IFlashcard[] }) {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard._id} flashcard={flashcard} />
      ))}
    </div>
  );
}
