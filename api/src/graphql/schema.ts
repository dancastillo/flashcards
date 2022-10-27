import { gql } from 'mercurius-codegen';

const schema = gql`
  type Flashcard {
    _id: ID!
    question: String!
    answer: String!
    category: String
  }

  type Category {
    _id: ID!
    category: String!
  }

  type Query {
    flashcards: [Flashcard!]!
    categories: [Category!]!
  }

  type Mutation {
    addFlashcard(question: String!, answer: String!, category: String): String
    addCategory(category: String!): String
    createNotification(message: String!): Boolean!
  }

  type Subscription {
    newNotification: String!
  }
`;
export default schema;
