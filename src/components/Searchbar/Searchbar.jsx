import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  ButtonSpan,
  SearchInput,
} from './Searchbar.styled.jsx';

class Searchbar extends Component {
  state = {
    text: '',
  };

  handleInput = evt => {
    this.setState({ text: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const query = this.state.text.trim().toLowerCase();
    if (!query) {
      return;
    }
    this.props.onSubmit(query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ text: '' });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <ButtonSpan>Search</ButtonSpan>
          </SearchButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
            value={this.state.text}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  text: PropTypes.string,
};

export default Searchbar;
