import { randomUUID } from 'crypto';
import { IFlashcard } from '../../models/flashcard';

export const id1 = randomUUID();

export const id2 = randomUUID();

export const fakeFlashcards = [{
  _id: id1,
  question: 'question',
  answer: 'answer',
  category: 'category',
  subcategory: 'subcategory',
}, {
  _id: id2, 
  question: 'question2',
  answer: 'answer2',
}] as IFlashcard[];

