import { randomUUID } from 'crypto';
import { mapResults } from '../../../graphql/resolvers/flashcard';
import { IFlashcard } from '../../../models/flashcard';

describe('grapql/resolvers/flashcard.ts', () => {
  
  const id1 = randomUUID();
  const id2 = randomUUID();
  const fakeFlashcards = [{
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
  })
});
