import React, { useState } from 'react';

import '../styles/navbar.css';

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Flashcard App
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
          <path
            fillRule="evenodd"
            // eslint-disable-next-line max-len
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'}>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/add-flashcard">Add Flashcard</a>
          </li>
          <li>
            <a href="/add-category">Add Cateogry</a>
          </li>
          <li>
            <a href="/add-sub-category">Add Subcateogry</a>
          </li>
          <li>
            <a href="/test">Test</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
