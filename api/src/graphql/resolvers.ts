import { IResolvers } from 'mercurius';
import Category, { ICategory } from '../models/category';
import Flashcard, { IFlashcard } from '../models/flashcard';
import Subcategory, { ISubcategory } from '../models/subcategory';

const NOTIFICATION = 'notification';

const resolvers: IResolvers = {
  Query: {
    async flashcards(_, obj): Promise<IFlashcard[]> {
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
    },

    async categories(_, obj): Promise<ICategory[]> {
      const categories = await Category.find();

      return categories.length
        ? categories.map(({ _id, category }: ICategory) => ({
            id: _id,
            category,
          }))
        : [];
    },

    async subcategories(_, obj): Promise<ISubcategory[]> {
      const subcategories = await Subcategory.find();

      return subcategories.length
        ? subcategories.map(({ _id, subcategory }: ISubcategory) => ({
            id: _id,
            subcategory,
          }))
        : [];
    },
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
    async addFlashcard(_, { question, answer, category }, ctx, info) {
      try {
        const flashcard = new Flashcard({
          question,
          answer,
          category,
        });

        await flashcard.save();
        return 'ok';
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    async addCategory(_, { category }, ctx, info) {
      try {
        const categoryObj = new Category({
          category,
        });

        await categoryObj.save();
        return 'ok';
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
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
