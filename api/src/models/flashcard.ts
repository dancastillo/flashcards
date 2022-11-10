import { Schema, model } from 'mongoose';

export interface IFlashcard {
  id: string;
  _id?: string;
  question: string;
  answer: string;
  category?: string;
  subcategory?: string;
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
  subcategory: {
    type: String,
  },
});

const Flashcard = model<IFlashcard>('Flashcard', flashcardSchema);

export default Flashcard;
