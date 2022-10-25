export const FlashcardsQuery = `
query {
  flashcards {
    _id
    question
    answer
    category
  }
}
`;

export const CategoriesQuery = `
query {
  categories {
    _id
    category
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
