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
      return handleError('Please enter a subcategory', setError);
    }

    const result = await addSubcategory({ subcategory });

    if (result.error) {
      handleError(result.error, setError);
    }

    return handleSuccess(setSuccess, 'subcategory');
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      {success && <div className="form-success">{success}</div>}
      {error && <div className="form-error">{error}</div>}
      <Input
        label="subcategory"
        labelText="What subcategory would you like to add?"
        inputType="string"
        inputId="subcategory"
        setState={setSubcategory}
      />
      <SubmitBtn />
    </form>
  );
}
