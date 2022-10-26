import { Component } from 'react';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Wrapper } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchFormSubmit = ({ inputValue }) => {
    console.log();
    this.setState({ searchQuery: inputValue });
  };

  render() {
    return (
      <Wrapper>
        <SearchForm onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
      </Wrapper>
    );
  }
}
