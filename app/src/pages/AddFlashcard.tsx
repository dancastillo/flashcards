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
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, addFlashcard] = useMutation(AddFlashcardMutation);

  const [{ data, fetching, error }] = useQuery({
    query: CategoriesQuery,
  });

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    resetSuccessAndErrorMessages(setSuccess, setRequestError);

    if (!question || !answer) {
      return handleError('Please enter question and answer!', setRequestError);
    }

    const result = await addFlashcard({ question, answer, category });

    if (result.error) {
      handleError(result.error, setRequestError);
    }

    return handleSuccess(setSuccess, 'flashcard');
  }

  if (fetching) return <p>Loading....</p>;
  if (error) {
    return (
      <p>
        Oh no...
        {error.message}
      </p>
    );
  }

  let options: IOptions[] = [];
  if (data) {
    options = data.categories.map((dataCategory: ICategory) => ({
      id: dataCategory._id,
      value: dataCategory.category,
    }));
  }
  return (
    <form onSubmit={handleSubmit}>
      {success && <div className="form-success">{success}</div>}
      {error && <div className="form-error">{error}</div>}
      {requestError && <div className="form-error">{requestError}</div>}
      <Input label="question" labelText="Question:" inputType="string" inputId="question" setState={setQuestion} />
      <Input label="answer" labelText="Answer:" inputType="string" inputId="answer" setState={setAnswer} />
      <Select
        label="question"
        labelText="Select a category:"
        selectId="categories"
        setState={setCategory}
        options={options}
      />
      <SubmitBtn />
    </form>
  );
}
