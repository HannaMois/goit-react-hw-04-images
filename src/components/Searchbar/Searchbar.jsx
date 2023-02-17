import { useState } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  ButtonSpan,
  SearchInput,
} from './Searchbar.styled.jsx';

const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleInput = evt => {
    setText(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const queryText = text.trim().toLowerCase();
    if (!queryText) {
      return;
    }
    onSubmit(queryText);
    resetForm();
  };

  const resetForm = () => {
    setText('');
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ButtonSpan>Search</ButtonSpan>
        </SearchButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          value={text}
        />
      </SearchForm>
    </SearchHeader>
  );
};

export default Searchbar;
