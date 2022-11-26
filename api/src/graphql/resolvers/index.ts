import { IResolvers } from 'mercurius';
import { addCategory, getAllCategories } from './category';
import { addFlashcard, getAllFlashcards, getFlashcardsByCategory, updateFlashcardById } from './flashcard';
import { addSubcategory, getAllSubcategories } from './subcategory';

const NOTIFICATION = 'notification';

const resolvers: IResolvers = {
  Query: {
    flashcards: () => getAllFlashcards(),

    categories: () => getAllCategories(),

    subcategories: () => getAllSubcategories(),

    getFlashcardsByCategory: (_, data) => getFlashcardsByCategory(data.category), 
  },
  Mutation: {
    createNotification(_root, { message }, { pubsub }) {
      pubsub.publish({
        topic: NOTIFICATION,
        payload: {
          newNotification: message,
        },
      });
      return true;
    },
    addFlashcard: (_, data) => addFlashcard(data),

    addCategory: (_, data) => addCategory(data),

    addSubcategory: (_, data) => addSubcategory(data),

    updateFlashcard: (_, data) => updateFlashcardById(data),
  },
  Subscription: {
    newNotification: {
      subscribe: (_root, _args, { pubsub }) => {
        return pubsub.subscribe(NOTIFICATION);
      },
    },
  },
};

export default resolvers;
