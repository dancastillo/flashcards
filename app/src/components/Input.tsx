import React from 'react';
import { IInput } from '../types';

import '../styles/form.css';

export default function Input({ label, labelText, inputType, inputId, setState, value }: IInput) {
  return (
    <>
      <label htmlFor={label}>{labelText}</label>
      <input type={inputType} id={inputId} onChange={(e) => setState(e.target.value.trim())} value={value} />
    </>
  );
}
