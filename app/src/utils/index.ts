export const handleSuccess = (setSuccess: Function, message: string) => {
  setSuccess(`Successfully added ${message}!`);
  setTimeout(() => setSuccess(''), 5000);
};

export const handleError = (error: object | string, setError: Function) => {
  if (!error) {
    return setError('Error adding.');
  }

  const err = typeof error === 'object' ? JSON.stringify(error) : error;
  return setError(err);
};

export const resetSuccessAndErrorMessages = (setSuccess: Function, setError: Function) => {
  setSuccess('');
  setError('');
};
