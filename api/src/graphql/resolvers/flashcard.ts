import Flashcard, { IFlashcard } from '../../models/flashcard';

const mapResults = (flashcardsArr: IFlashcard[]): IFlashcard[] => {
  return flashcardsArr.map(({ _id, question, answer, category, subcategory }: IFlashcard) => ({
    id: _id,
    question,
    answer,
    category,
    subcategory,
  }));
}

export const getAllFlashcards = async (): Promise<IFlashcard[]> => {
  const flashcards = await Flashcard.find();

  return mapResults(flashcards);
};

export const addFlashcard = async ({
  question,
  answer,
  category,
  subcategory,
}: {
  question: string;
  answer: string;
  category?: string;
  subcategory?: string;
}) => {
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
};

export const updateFlashcardById = async ({
  id,
  question,
  answer,
  category,
  subcategory,
}: {
  id: string;
  question: string;
  answer: string;
  category?: string;
  subcategory?: string;
}) => {
  try {
    await Flashcard.findOneAndUpdate({ _id: id }, { question, answer, category, subcategory });

    return 'ok';
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getFlashcardsByCategory = async (category: string) => {
  if (!category) {
    return [];
  }

  const flashcards = await Flashcard.find({ category }).exec();

  return mapResults(flashcards);
}

