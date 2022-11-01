import React, { useState } from 'react';
import { useMutation, useQuery } from 'urql';
import Input from '../components/Input';
import Select from '../components/Select';
import SubmitBtn from '../components/SubmitBtn';
import { CategoriesQuery, AddFlashcard as AddFlashcardMutation } from '../graphql';
import { ICategory, IOptions } from '../types';
import { resetSuccessAndErrorMessages, handleError, handleSuccess } from '../utils';

export default function AddFlashcard() {
  const [requestError, setRequestError] = useState('');
  const [success, setSuccess] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, addFlashcard] = useMutation(AddFlashcardMutation);

  const [categoryQuery] = useQuery({
    query: CategoriesQuery,
  });

  const [subcategoryQuery] = useQuery({
    query: CategoriesQuery,
  });

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    resetSuccessAndErrorMessages(setSuccess, setRequestError);

    if (!question || !answer) {
      return handleError('Please enter question and answer!', setRequestError);
    }

    const result = await addFlashcard({ question, answer, category, subcategory });

    if (result.error) {
      handleError(result.error, setRequestError);
    }
    return handleSuccess(setSuccess, 'flashcard');
  }

  if (categoryQuery.fetching || subcategoryQuery.fetching) return <p>Loading....</p>;
  if (categoryQuery.error) {
    return (
      <p>
        Oh no...
        {categoryQuery.error.message}
      </p>
    );
  }

  if (subcategoryQuery.error) {
    return (
      <p>
        Oh no...
        {subcategoryQuery.error.message}
      </p>
    );
  }

  let categoryOptions: IOptions[] = [];
  if (categoryQuery.data) {
    categoryOptions = categoryQuery.data.categories.map((dataCategory: ICategory) => ({
      id: dataCategory.id,
      value: dataCategory.category,
    }));
  }

  let subcategoryOptions: IOptions[] = [];
  if (subcategoryQuery.data) {
    subcategoryOptions = subcategoryQuery.data.categories.map((dataSubcategory: ICategory) => ({
      id: dataSubcategory.id,
      value: dataSubcategory.category,
    }));
  }
  return (
    <form onSubmit={handleSubmit}>
      {success && <div className="form-success">{success}</div>}
      {requestError && <div className="form-error">{requestError}</div>}
      <Input label="question" labelText="Question:" inputType="string" inputId="question" setState={setQuestion} />
      <Input label="answer" labelText="Answer:" inputType="string" inputId="answer" setState={setAnswer} />
      <Select
        label="question"
        labelText="Select a category:"
        selectId="categories"
        setState={setCategory}
        options={categoryOptions}
      />
      <Select
        label="question"
        labelText="Select a category:"
        selectId="categories"
        setState={setSubcategory}
        options={subcategoryOptions}
      />
      <SubmitBtn />
    </form>
  );
}
