import React, { useState } from 'react';
import { useMutation } from 'urql';
import Input from '../components/Input';
import SubmitBtn from '../components/SubmitBtn';
import { AddCategory as AddCategoryMutation } from '../graphql';

import '../styles/form.css';
import { handleError, handleSuccess, resetSuccessAndErrorMessages } from '../utils';

export default function AddCategory() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [category, setCategory] = useState('');
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, addCategory] = useMutation(AddCategoryMutation);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    resetSuccessAndErrorMessages(setSuccess, setError);

    if (!category) {
      return handleError('Please enter a category', setError);
    }

    const result = await addCategory({ category });

    if (result.error) {
      handleError(result.error, setError);
    }

    return handleSuccess(setSuccess, 'category');
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      {success && <div className="form-success">{success}</div>}
      {error && <div className="form-error">{error}</div>}
      <Input label="category" labelText="What category would you like to add?" inputType="string" inputId="category" setState={setCategory} />
      <SubmitBtn />
    </form>
  );
}
