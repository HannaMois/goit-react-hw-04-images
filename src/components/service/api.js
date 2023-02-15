import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '32841517-26afb12f8bbb7df3fa6709fac';

export const getImages = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    page: page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };
  const { data } = await axios.get(`${axios.defaults.baseURL}`, { params });

  const images = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    tags,
    webformatURL,
    largeImageURL,
  }));

  const totalPages = Math.ceil(data.totalHits / params.per_page);
  return { images, totalPages };
};
