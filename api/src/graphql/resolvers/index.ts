import { IResolvers } from 'mercurius';
import { addCategory, getAllCategories } from './category';
import { addFlashcard, getAllFlashcards } from './flashcard';
import { getAllSubcategories } from './subcategory';

const NOTIFICATION = 'notification';

const resolvers: IResolvers = {
  Query: {
    flashcards: () => getAllFlashcards(),

    categories: () => getAllCategories(),

    subcategories: () => getAllSubcategories(),
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
    addFlashcard: (_, { question, answer, category, subcategory }, ctx, info) => addFlashcard(question, answer, category, subcategory),

    addCategory: (_, data, ctx, info) => addCategory(data),
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
