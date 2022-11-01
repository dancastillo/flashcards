import React, { useState } from 'react';
import { useMutation } from 'urql';
import Input from '../components/Input';
import SubmitBtn from '../components/SubmitBtn';
import { AddSubcategory as AddSubcategoryMutation } from '../graphql';

import '../styles/form.css';
import { handleError, handleSuccess, resetSuccessAndErrorMessages } from '../utils';

export default function AddSubcategory() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [subcategory, setSubcategory] = useState('');
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, addSubcategory] = useMutation(AddSubcategoryMutation);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    resetSuccessAndErrorMessages(setSuccess, setError);

    if (!subcategory) {
      return handleError('Please enter a category', setError);
    }

    const result = await addSubcategory({ subcategory });

    if (result.error) {
      handleError(result.error, setError);
    }

    return handleSuccess(setSuccess, 'subcategory');
  }

  return (
    <form onSubmit={handleSubmit}>
      {success && <div className="form-success">{success}</div>}
      {error && <div className="form-error">{error}</div>}
      <Input
        label="category"
        labelText="What subcategory would you like to add?"
        inputType="string"
        inputId="category"
        setState={setSubcategory}
      />
      <SubmitBtn />
    </form>
  );
}
