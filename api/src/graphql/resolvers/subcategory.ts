import Subcategory, { ISubcategory } from '../../models/subcategory';

export const getAllSubcategories = async (): Promise<ISubcategory[]> => {
  const subcategories = await Subcategory.find();

  return subcategories.length
    ? subcategories.map(({ _id, subcategory }: ISubcategory) => ({
        id: _id,
        subcategory,
      }))
    : [];
};

export const addSubcategory = async ({ subcategory }) => {
  try {
    const subcategoryObj = new Subcategory({
      subcategory,
    });

    await subcategoryObj.save();
    return 'ok';
  } catch (err) {
    console.error(err);
    throw err;
  }
};
