import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageByQuery } from 'components/services/api';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
  };

  onSearch = async searchQuery => {
    try {
      this.setState({ isLoading: true });
      const data = await getImageByQuery(searchQuery);
      this.setState(state => ({
        images: [...this.state.images, ...data],
        isLoading: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.onSearch(searchQuery);
    }
  }

  render() {
    const { images } = this.state;    
    
    return (
      <Gallery>
        { images.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem key={id} 
                            webformatURL={webformatURL} 
                            tags={tags} />
        ))}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}