import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button.styled';

export const ButtonLoadMore = ({ loadMore }) => {
  return (
    <Button type="button" onClick={loadMore}>
      Load more
    </Button>
  );
};

ButtonLoadMore.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
