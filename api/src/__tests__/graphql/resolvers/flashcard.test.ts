import { addFlashcard, getAllFlashcards, getFlashcardsByCategory, mapResults, updateFlashcardById } from '../../../graphql/resolvers/flashcard';
import Flashcard from '../../../models/flashcard';
import { fakeFlashcards, id1, id2 } from '../../data';

jest.mock('../../../models/Flashcard');

describe('grapql/resolvers/flashcard.ts', () => {
  describe('mapResults', () => {
    it('mapResults should return flashcard array formatted', () => {
      const arr = mapResults(fakeFlashcards);

      expect(arr.length).toBe(2);
      expect(arr[0].id).toBe(id1);
      expect(arr[0]).toEqual(expect.objectContaining(({
        question: fakeFlashcards[0].question,
        answer: fakeFlashcards[0].answer,
        category: fakeFlashcards[0].category,
        subcategory: fakeFlashcards[0].subcategory,
        id: id1
      })));
      expect(arr[1].id).toBe(id2);
      expect(arr[1]).toEqual(expect.objectContaining(({
        question: fakeFlashcards[1].question,
        answer: fakeFlashcards[1].answer,
        category: fakeFlashcards[1].category,
        subcategory: fakeFlashcards[1].subcategory,
        id: id2 
      })));
    });
  });

  describe('getAllFlashcards', () => {
    beforeEach(() => {
      Flashcard.find = jest.fn().mockResolvedValue(fakeFlashcards);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should successfully get all flashcards', async () => {
      const flashcards = await getAllFlashcards();

      expect(flashcards.length).toBe(2);
      expect(flashcards[0].id).toBe(id1);
      expect(flashcards[0]).toEqual(expect.objectContaining(({
        question: fakeFlashcards[0].question,
        answer: fakeFlashcards[0].answer,
        category: fakeFlashcards[0].category,
        subcategory: fakeFlashcards[0].subcategory,
        id: id1
      })));
      expect(flashcards[1].id).toBe(id2);
      expect(flashcards[1]).toEqual(expect.objectContaining(({
        question: fakeFlashcards[1].question,
        answer: fakeFlashcards[1].answer,
        category: fakeFlashcards[1].category,
        subcategory: fakeFlashcards[1].subcategory,
        id: id2 
      })));
   });
  });

  describe('addFlashcard', () => {
    beforeEach(() => {
      Flashcard.prototype.save = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should successfully add a flashcard', async () => {
      const add = await addFlashcard({
        question: 'question',
        answer: 'answer',
        category: 'category',
        subcategory: 'subcategory',
      });
      expect(add).toBe('ok');
      expect(Flashcard).toHaveBeenCalledTimes(1);
      expect(Flashcard).toBeCalledWith({
        question: 'question',
        answer: 'answer',
        category: 'category',
        subcategory: 'subcategory',
      });
    });
  });

  describe('updateFlashcardById', () => {
    beforeEach(() => {
      Flashcard.findOneAndUpdate = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should successfully update a flashcard', async () => {
      const update = await updateFlashcardById({
        id: id1,
        question: 'question',
        answer: 'answer',
        category: 'category',
        subcategory: 'subcategory',
      });
      expect(update).toBe('ok');
      expect(Flashcard.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(Flashcard.findOneAndUpdate).toBeCalledWith({
        _id: id1,
      }, {
        question: 'question',
        answer: 'answer',
        category: 'category',
        subcategory: 'subcategory',
      });
    });
  });

  describe('getFlashcardsByCategory with results', () => {
    beforeEach(() => {
      Flashcard.find = jest.fn().mockResolvedValue(fakeFlashcards);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should successfully get flashcards with category', async () => {
      const flashcards = await getFlashcardsByCategory('category');

      expect(flashcards.length).toBe(2);
      expect(flashcards[0].id).toBe(id1);
      expect(flashcards[0]).toEqual(expect.objectContaining(({
        question: fakeFlashcards[0].question,
        answer: fakeFlashcards[0].answer,
        category: fakeFlashcards[0].category,
        subcategory: fakeFlashcards[0].subcategory,
        id: id1
      })));
      expect(flashcards[1].id).toBe(id2);
      expect(flashcards[1]).toEqual(expect.objectContaining(({
        question: fakeFlashcards[1].question,
        answer: fakeFlashcards[1].answer,
        category: fakeFlashcards[1].category,
        subcategory: fakeFlashcards[1].subcategory,
        id: id2 
      })));
   });
  });

  describe('getFlashcardsByCategory with no results', () => {
    beforeEach(() => {
      Flashcard.find = jest.fn().mockResolvedValue([]);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should successfully get no flashcards when undefined category is passed', async () => {
      const flashcards = await getFlashcardsByCategory(undefined);
      expect(flashcards.length).toBe(0);
    });

    it('should successfully get no flashcards when empty category is passed', async () => {
      const flashcards = await getFlashcardsByCategory('');
      expect(flashcards.length).toBe(0);
    });
  });


});
