import { Component } from 'react';
// import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Wrapper } from './App.styled';
import { getImageByQuery } from 'components/services/api';
import { ButtonLoadMore } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    page: 1,
    largeImageSrc: '',   
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.onSearch();
    }
  }

  handleSearchFormSubmit = ({ inputValue }) => {
    this.setState({
      searchQuery: inputValue,
      images: [],
      page: 1,
    });
  };

  onSearch = async () => {
    try {
      const { searchQuery, page } = this.state;

      this.setState({ isLoading: true });
      const data = await getImageByQuery(searchQuery, page);
      const { totalHits, hits } = data;
      if (totalHits === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState(state => ({
        images: [...this.state.images, ...hits],
        isLoading: false,
      }));
    } catch (error) {     
        toast.error('Something went wrong. Try again.');
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = (e) => {
    this.setState({ largeImageSrc: e.target.dataset.sourse })
  }

  onCloseModal = (e) => {
    this.setState({ largeImageSrc: '' })
  }

 

  render() {
    const { images, isLoading, largeImageSrc } = this.state;
    

    return (
      <Wrapper>
        <SearchForm onSubmit={this.handleSearchFormSubmit} />        
        <ImageGallery images={images} onOpenModal={this.onOpenModal}></ImageGallery>
        {images.length >= 12 && <ButtonLoadMore loadMore={this.loadMore} />}
        {isLoading && <ThreeDots color="red" />}
        {largeImageSrc.length > 0 && <Modal largeImageURL={largeImageSrc} onCloseModal={this.onCloseModal}/>}

        <Toaster
          position="top-right"
          toastOptions={{
            error: {
              duration: 3000,
              style: {
                border: '2px solid red',
              },
            },
          }}
        />
      </Wrapper>
    );
  }
}
