import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalImage } from './Modal.styled';

export const Modal = ({ largeImageURL, onCloseModal }) => {

  useEffect(() => {

    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    
    console.log("handle")
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      console.log("snim")
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

 

  const handleOverlay = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlay}>
      <ModalImage>
        <img src={largeImageURL} alt="" />
      </ModalImage>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
