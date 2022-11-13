import Category, { ICategory } from '../../models/category';

export const getAllCategories = async (): Promise<ICategory[]> => {
  const categories = await Category.find();

  return categories.length
    ? categories.map(({ _id, category }: ICategory) => ({
        id: _id,
        category,
      }))
    : [];
};

export const addCategory = async ({ category }) => {
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
};
