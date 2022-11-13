/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { IOptions, ISelect } from '../types';

import '../styles/form.css';

export default function Select({ label, labelText, selectId, setState, options, optionSelected }: ISelect) {
  return (
    <>
      <label htmlFor={label}>{labelText}</label>
      <select id={selectId} onChange={(e) => setState(e.target.value)} value={optionSelected}>
        <option key="blank" />
        {options.map(({ id, value }: IOptions) => (
          <option key={`${id}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
