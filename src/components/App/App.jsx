import { Component } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ButtonLoadMore } from 'components/Button/Button';
import { Wrapper } from './App.styled';
import { Button } from 'components/Button/Button.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSearchFormSubmit = ({ inputValue }) => {
    console.log();
    this.setState({ searchQuery: inputValue });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <Wrapper>
        <SearchForm onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
        <ButtonLoadMore onClick={this.loadMore} />
      </Wrapper>
    );
  }
}
