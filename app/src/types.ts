export interface IFlashcard {
  id: string;
  question: string;
  answer: string;
  category?: string;
  options?: string[];
}

export interface ICategory {
  id: string;
  category: string;
}

export interface IOptions {
  id: string;
  value: string;
}

export interface ISelect {
  label: string;
  labelText: string;
  selectId: string;
  setState: Function;
  options: IOptions[];
}

export interface IInput {
  label: string;
  labelText: string;
  inputType: string;
  inputId: string;
  setState: Function;
}
