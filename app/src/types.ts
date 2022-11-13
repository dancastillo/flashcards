export interface IFlashcard {
  id: string;
  question: string;
  answer: string;
  category?: string;
  subcategory?: string;
  options?: string[];
}

export interface ICategory {
  id: string;
  category: string;
}

export interface ISubcategory {
  id: string;
  subcategory: string;
}

export interface IOptions {
  id: string;
  value: string;
  selected?: boolean;
}

export interface ISelect {
  label: string;
  labelText: string;
  selectId: string;
  setState: Function;
  options: IOptions[];
  optionSelected?: string;
}

export interface IInput {
  label: string;
  labelText: string;
  inputType: string;
  inputId: string;
  setState: Function;
  value?: string;
}
