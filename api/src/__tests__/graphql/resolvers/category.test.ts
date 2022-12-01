import { randomUUID } from 'crypto';
import { addCategory, getAllCategories } from '../../../graphql/resolvers/category'
import Category from '../../../models/category';

jest.mock('../../../models/category')

describe('graphql/resolves/category', () => {
  describe('addCategory', () => {
    it('should successfully add a category', async () => {
      const add = await addCategory({ category: 'testing' });
      expect(add).toBe('ok');
      expect(Category).toHaveBeenCalledTimes(1);
      expect(Category).toBeCalledWith({ category: 'testing' });
    });
  });

  describe('addCategory Error', () => {
    beforeEach(() => {
      Category.prototype.save = jest.fn().mockRejectedValue(new Error('Failed'));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should throw error on addCategory', () => {
      expect(async () => addCategory({ category: 'testing' })).rejects.toThrow('Failed');
    });
  });

  describe('getAllCategories', () => {
    const categoryIdOne = randomUUID();
    const categoryIdTwo = randomUUID();

    beforeEach(() => {
      Category.find = jest.fn().mockResolvedValue([
        {
          _id: categoryIdOne,
          category: 'nodejs',
        }, {
          _id: categoryIdTwo,
          category: 'typescript',
        }
      ]);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should successfully get all categories', async () => {
      const categories = await getAllCategories();

      expect(categories.length).toBe(2);
      expect(Category.find).toHaveBeenCalledTimes(1);
    });
  });


  describe('getAllCategories Error', () => {
    beforeEach(() => {
      Category.find = jest.fn().mockRejectedValue(new Error('Failed'));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should throw error on addCategory', () => {
      expect(async () => getAllCategories()).rejects.toThrow('Failed');
    });
  });

});
