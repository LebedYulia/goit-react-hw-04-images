import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Searchbar, Form, Field, SearchFormButton, ButtonLabel } from './SearchForm.styled';


const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

const initialValue = {
  searchQuery: "",
};

export const SearchForm = () => {
  
const handleSubmit = (value, { resetForm }) => {
   console.log(value)
  resetForm();
};

  
    return (
      <Searchbar >
        <Formik 
        initialValues={{ initialValue }}
        validationSchema ={{ schema }}
        onSubmit = {handleSubmit}
        >
          <Form >
          <SearchFormButton type="submit" className="button">
            <ButtonLabel className="button-label">Search</ButtonLabel>
          </SearchFormButton>

          <Field 
          className="input"
          type="text"
          name="searchQuery"                    
          placeholder="Search images and photos"
          />
          <ErrorMessage name="searchQuery" />          
          
          </Form>
        </Formik>
      </Searchbar>
    );
  }

