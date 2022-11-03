import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImageByQuery } from 'components/services/api';
import { ButtonLoadMore } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Wrapper } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageSrc, setLargeImageSrc] = useState('');

  useEffect(() => {
    if (searchQuery === "") {      
      return;
    }

    async function onSearch() {
      try {
        setIsLoading(true);
        const data = await getImageByQuery(searchQuery, page);
        const { hits } = data;
        if (hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong. Try again.');
      }
    }

    onSearch();
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = e => {
    setLargeImageSrc(e.target.dataset.sourse);
  };

  const onCloseModal = e => {
    setLargeImageSrc('');
  };

  const handleSearchFormSubmit = ({ inputValue }) => {
    if (inputValue === searchQuery) {
      return;
    }

    setSearchQuery(inputValue);
    setImages([]);
    setPage(1);
  };

  return (
    <Wrapper>
      <SearchForm onSubmit={handleSearchFormSubmit} />
      <ImageGallery images={images} onOpenModal={onOpenModal}></ImageGallery>
      {isLoading && <ThreeDots color="red" wrapperStyle={{ margin: 'auto' }} />}
      {images.length >= 12 && <ButtonLoadMore loadMore={loadMore} />}
      {largeImageSrc.length > 0 && (
        <Modal largeImageURL={largeImageSrc} onCloseModal={onCloseModal} />
      )}

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
};
