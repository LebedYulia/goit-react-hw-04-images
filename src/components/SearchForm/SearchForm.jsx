import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import { Searchbar, Form, Field, SearchFormButton } from './SearchForm.styled';

const schema = yup.object().shape({
  inputValue: yup.string(),
});

const initialValue = {
  inputValue: '',
};

export const SearchForm = props => {
  const handleSubmit = value => {
    
    if (value.inputValue.trim() === "") {      
      toast.error('Please, enter search query!');
      return;
    }
    props.onSubmit(value);
  };

  return (
    <Searchbar>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <SearchFormButton type="submit">
            <IoIosSearch size="1.5em" />
          </SearchFormButton>

          <Field
            type="text"
            name="inputValue"
            placeholder="Search images and photos"
          />
          <ErrorMessage name="inputValue" />
        </Form>
      </Formik>
    </Searchbar>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
