import { Schema, model } from 'mongoose';

export interface ISubcategory {
  id: string;
  _id?: string;
  subcategory: string;
}

const subcategorySchema = new Schema<ISubcategory>({
  subcategory: {
    type: String,
    require: true,
  },
});

const Subcategory = model<ISubcategory>('Subcategory', subcategorySchema);

export default Subcategory;
