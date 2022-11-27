export const FlashcardsQuery = `
query {
  flashcards {
    id
    question
    answer
    category
    subcategory
  }
}
`;

export const CategoriesQuery = `
query {
  categories {
    id
    category
  }
}
`;

export const SubcategoriesQuery = `
query {
  subcategories {
    id
    subcategory
  }
}
`;

export const GetFlashcardsByCategoryQuery = `
query ($category: String) {
  getFlashcardsByCategory(category: $category) {
    id
    question
    answer
    category
    subcategory
  }
}
`;

export const AddFlashcard = `
mutation ($question: String!, $answer: String!, $category: String, $subcategory: String) {
  addFlashcard(question: $question, answer: $answer, category: $category, subcategory: $subcategory)
}
`;

export const AddCategory = `
mutation ($category: String!) {
  addCategory(category: $category)
}
`;

export const AddSubcategory = `
mutation ($subcategory: String!) {
  addSubcategory(subcategory: $subcategory)
}
`;

export const UpdateFlashcard = `
mutation ($id: ID!, $question: String!, $answer: String!, $category: String, $subcategory: String) {
  updateFlashcard(id: $id, question: $question, answer: $answer, category: $category, subcategory: $subcategory)
}
`;
