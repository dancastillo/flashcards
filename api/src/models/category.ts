import { Schema, model } from 'mongoose';

export interface ICategory {
  id: string;
  _id?: string;
  category: string;
}

const categorySchema = new Schema<ICategory>({
  category: {
    type: String,
    require: true,
  },
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
