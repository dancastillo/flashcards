import React from 'react';
import { IOptions, ISelect } from '../types';

import '../styles/form.css';

export default function Select({ label, labelText, selectId, setState, options }: ISelect) {
  return (
    <>
      <label htmlFor={label}>{labelText}</label>
      <select id={selectId} onChange={(e) => setState(e.target.value)}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <option key="blank" value={undefined} disabled selected />
        {options.map(({ id, value }: IOptions) => (
          <option key={id} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
