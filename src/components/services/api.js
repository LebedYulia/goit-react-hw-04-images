import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const KEY = '29641497-e95f803aba10936f30ac1e55f';

export const getImageByQuery = async searchQuery => {
  const params = {
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
  };

  const response = await axios.get(baseURL, { params });
  const data = await response.data;

  console.log(data);
  return data.hits;
};
