/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import '../index.css';
import { ICategory, IFlashcard, IOptions, ISubcategory } from '../types';
import { resetSuccessAndErrorMessages, handleError, handleSuccess } from '../utils';
import Input from './Input';
import Select from './Select';
import SubmitBtn from './SubmitBtn';
import { CategoriesQuery, UpdateFlashcard as UpdateFlashcardMutation, SubcategoriesQuery } from '../graphql';

export default function EditModal({ show, close, flashcard }: { show: boolean; close: Function; flashcard: IFlashcard }) {
  const [requestError, setRequestError] = useState('');
  const [success, setSuccess] = useState('');
  const [id, setId] = useState(flashcard.id);
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);
  const [category, setCategory] = useState(flashcard.category);
  const [subcategory, setSubcategory] = useState(flashcard.subcategory);
  const [_, UpdateFlashcard] = useMutation(UpdateFlashcardMutation);

  const [categoryQuery] = useQuery({
    query: CategoriesQuery,
  });

  const [subcategoryQuery] = useQuery({
    query: SubcategoriesQuery,
  });

  async function handleSubmitEdit(e: React.SyntheticEvent) {
    e.preventDefault();
    resetSuccessAndErrorMessages(setSuccess, setRequestError);

    if (!id) {
      return handleError('Missing flashcard id!', setRequestError);
    }

    if (!question || !answer) {
      return handleError('Please enter question and answer!', setRequestError);
    }

    const result = await UpdateFlashcard({ id, question, answer, category, subcategory });

    if (result.error) {
      handleError(result.error, setRequestError);
    }

    handleSuccess(setSuccess, 'flashcard');
    return close();
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
    subcategoryOptions = subcategoryQuery.data.subcategories.map((dataSubcategory: ISubcategory) => ({
      id: dataSubcategory.id,
      value: dataSubcategory.subcategory,
    }));
  }

  return (
    <>
      <div className="modal-overlay" onClick={() => close()}>
        <div onClick={(e) => e.stopPropagation()} className="modal-box">
          <form onSubmit={handleSubmitEdit}>
            {success && <div className="form-success">{success}</div>}
            {requestError && <div className="form-error">{requestError}</div>}
            <Input label="question" labelText="Question:" inputType="string" inputId="question" setState={setQuestion} value={question} />
            <Input label="answer" labelText="Answer:" inputType="string" inputId="answer" setState={setAnswer} value={answer} />
            <Select
              label="question-category"
              labelText="Select a category:"
              selectId="categories"
              setState={setCategory}
              options={categoryOptions}
              optionSelected={category}
            />
            <Select
              label="question-subcategory"
              labelText="Select a subcategory:"
              selectId="subcategories"
              setState={setSubcategory}
              options={subcategoryOptions}
              optionSelected={subcategory}
            />
            <SubmitBtn />
          </form>
        </div>
      </div>
    </>
  );
}
