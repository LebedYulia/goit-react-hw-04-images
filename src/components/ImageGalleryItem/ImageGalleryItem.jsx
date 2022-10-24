import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} loading="lazy" />
    </GalleryItem>
  );
};


ImageGalleryItem.propTypes ={
  webformatURL: PropTypes.string.isRequired, 
  tags:  PropTypes.string,
}