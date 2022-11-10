import { gql } from 'mercurius-codegen';

const schema = gql`
  type Flashcard {
    id: ID!
    question: String!
    answer: String!
    category: String
  }

  type Category {
    id: ID
    category: String
  }

  type Subcategory {
    id: ID
    subcategory: String
  }

  type Query {
    flashcards: [Flashcard!]!
    categories: [Category!]!
    subcategories: [Subcategory!]!
  }

  type Mutation {
    addFlashcard(question: String!, answer: String!, category: String): String
    addCategory(category: String!): String
    addSubcategory(subcategory: String!): String
    createNotification(message: String!): Boolean!
  }

  type Subscription {
    newNotification: String!
  }
`;
export default schema;
