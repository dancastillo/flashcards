import Flashcard, { IFlashcard } from '../../models/flashcard';

export const getAllFlashcards = async (): Promise<IFlashcard[]> => {
  const flashcards = await Flashcard.find();

  return flashcards.map(
    ({ _id, question, answer, category, subcategory }: IFlashcard) => ({
      id: _id,
      question,
      answer,
      category,
      subcategory,
    })
  );
};

export const addFlashcard = async (
  question: string,
  answer: string,
  category?: string,
  subcategory?: string,
) => {
  try {
    const flashcard = new Flashcard({
      question,
      answer,
      category,
      subcategory,
    });

    await flashcard.save();
    return 'ok';
  } catch (err) {
    console.error(err);
    throw err;
  }
}