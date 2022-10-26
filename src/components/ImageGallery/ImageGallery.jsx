import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageByQuery } from 'components/services/api';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ButtonLoadMore } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
  };

  // resetState = () => {

  //     this.setState({
  //       images: [],
  //       page: 1,

  //   })
  // }

  onSearch = async () => {
    try {
      const page = this.state.page;
      const { searchQuery } = this.props;

      this.setState({ isLoading: true });
      const data = await getImageByQuery(searchQuery, page);
      const { hits } = data;
      this.setState(state => ({
        images: [...this.state.images, ...hits],
        isLoading: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState)  {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
       
      this.onSearch();
    } else if (prevState.page !== page) {
      this.onSearch();
    }
  }

  render() {
    const { images } = this.state;

    return (
      <div>
        <Gallery>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}
        </Gallery>
        <ButtonLoadMore loadMore={this.loadMore} />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
