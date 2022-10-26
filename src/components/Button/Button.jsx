import React from 'react';
import { Button } from './Button.styled';

export const ButtonLoadMore = ({ loadMore }) => {
  return (
    <Button type="button" onClick={loadMore}>
      Load more
    </Button>
  );
};
