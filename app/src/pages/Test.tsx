/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { CombinedError, useMutation, useQuery } from 'urql';
import FlashcardList from '../components/FlashcardList';
import Select from '../components/Select';
import { CategoriesQuery, GetFlashcardsByCategoryQuery } from '../graphql';
import { ICategory, IOptions } from '../types';

export default function Test() {
  const [category, setCategory] = useState('');

  const [categoryQuery] = useQuery({
    query: CategoriesQuery,
  });

  const [flashcardByCategoryQuery] = useQuery({
    query: GetFlashcardsByCategoryQuery,
    variables: { category }
  });

  if (categoryQuery.fetching) return <p>Loading....</p>;
  if (categoryQuery.error) {
    return (
      <p>
        Oh no...
        {categoryQuery.error.message}
      </p>
    );
  }

  let categoryOptions: IOptions[] = [];
  if (categoryQuery.data) {
    categoryOptions = categoryQuery.data.categories.map((dataCategory: ICategory) => {
      return {
        id: dataCategory.id,
        value: dataCategory.category,
      };
    });
  }

  return (
    <div className='container'>
      <Select label="question-category" labelText="Select a category:" selectId="categories" setState={setCategory} options={categoryOptions} />

      {!category
        ? (<>please select a cateogry</>)
        : (<>selected: {category}</>)
      }

      {flashcardByCategoryQuery.fetching && (<p>Loading flashcards with category: {category}.....</p>)}
      {flashcardByCategoryQuery.error && (<p>Oh no.... {flashcardByCategoryQuery.error.message}</p>)}
      {flashcardByCategoryQuery.data.getFlashcardsByCategory && flashcardByCategoryQuery.data.getFlashcardsByCategory.length 
        ? (
          <FlashcardList flashcards={flashcardByCategoryQuery.data.getFlashcardsByCategory} />
        )
        : (<p>No flashcards with category {category} found......</p>)
      }
    </div>
 );
}

