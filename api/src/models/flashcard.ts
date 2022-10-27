import { Schema, model } from 'mongoose';

export interface IFlashcard {
  question: string;
  answer: string;
  category?: string;
}

const flashcardSchema = new Schema<IFlashcard>({
  question: {
    type: String,
    require: true,
  },
  answer: {
    type: String,
    require: true,
  },
  category: {
    type: String,
  },
});

const Flashcard = model<IFlashcard>('Flashcard', flashcardSchema);

export default Flashcard;
