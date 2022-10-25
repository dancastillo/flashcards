import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddCategory from './pages/AddCategory';
import AddFlashcard from './pages/AddFlashcard';
import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add-flashcard" element={<AddFlashcard />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="test" element={<Test />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
