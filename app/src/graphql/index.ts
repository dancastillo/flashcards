export const FlashcardsQuery = `
query {
  flashcards {
    id
    question
    answer
    category
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

export const AddFlashcard = `
mutation ($question: String!, $answer: String!, $category: String) {
  addFlashcard(question: $question, answer: $answer, category: $category)
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