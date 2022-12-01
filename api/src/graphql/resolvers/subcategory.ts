import Subcategory, { ISubcategory } from '../../models/subcategory';

export const getAllSubcategories = async (): Promise<ISubcategory[]> => {
  try {
    const subcategories = await Subcategory.find();

    return subcategories.length
      ? subcategories.map(({ _id, subcategory }: ISubcategory) => ({
          id: _id,
          subcategory,
        }))
      : [];
  } catch (err) {
    throw err;
  }
};

export const addSubcategory = async ({ subcategory }) => {
  try {
    const subcategoryObj = new Subcategory({
      subcategory,
    });

    await subcategoryObj.save();
    return 'ok';
  } catch (err) {
    throw err;
  }
};
