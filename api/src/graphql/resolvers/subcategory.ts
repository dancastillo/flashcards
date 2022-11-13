import Subcategory, { ISubcategory } from '../../models/subcategory';

export const getAllSubcategories = async (): Promise<ISubcategory[]> => {
  const subcategories = await Subcategory.find();

  return subcategories.length
    ? subcategories.map(({ _id, subcategory }: ISubcategory) => ({
        id: _id,
        subcategory,
      }))
    : [];
}
