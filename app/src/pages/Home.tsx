import React from 'react';
import { useQuery } from 'urql';
import FlashcardList from '../components/FlashcardList';
import { FlashcardsQuery } from '../graphql';

function Home() {
  const [{ data, fetching, error }] = useQuery({
    query: FlashcardsQuery,
  });

  if (fetching) return <p>Loading....</p>;
  if (error) {
    return (
      <div className="container">
        <FlashcardList flashcards={[]} />
      </div>
    );
  }

  return (
    <div className="container">
      <FlashcardList flashcards={data.flashcards} />
    </div>
  );
}

export default Home;
