import { randomUUID } from 'crypto';
import { addSubcategory, getAllSubcategories } from '../../../graphql/resolvers/subcategory'
import Subcategory from '../../../models/Subcategory';

jest.mock('../../../models/subcategory')

describe('graphql/resolves/subcategory', () => {
  describe('addSubcategory', () => {
    it('should successfully add a subcategory', async () => {
      const add = await addSubcategory({ subcategory: 'testing' });
      expect(add).toBe('ok');
      expect(Subcategory).toHaveBeenCalledTimes(1);
      expect(Subcategory).toBeCalledWith({ subcategory: 'testing' });
    });
  });

  describe('addsubcategory Error', () => {
    beforeEach(() => {
      Subcategory.prototype.save = jest.fn().mockRejectedValue(new Error('Failed'));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should throw error on addsubcategory', () => {
      expect(async () => addSubcategory({ subcategory: 'testing' })).rejects.toThrow('Failed');
    });
  });

  describe('getAllSubcategories', () => {
    const subcategoryIdOne = randomUUID();
    const subcategoryIdTwo = randomUUID();

    beforeEach(() => {
      Subcategory.find = jest.fn().mockResolvedValue([
        {
          _id: subcategoryIdOne,
          subcategory: 'nodejs',
        }, {
          _id: subcategoryIdTwo,
          subcategory: 'typescript',
        }
      ]);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should successfully get all categories', async () => {
      const subcategories = await getAllSubcategories();

      expect(subcategories.length).toBe(2);
      expect(Subcategory.find).toHaveBeenCalledTimes(1);
    });
  });


  describe('getAllSubcategories Error', () => {
    beforeEach(() => {
      Subcategory.find = jest.fn().mockRejectedValue(new Error('Failed'));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should throw error on addsubcategory', () => {
      expect(async () => getAllSubcategories()).rejects.toThrow('Failed');
    });
  });
});
