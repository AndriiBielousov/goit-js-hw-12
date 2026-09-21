import axios from 'axios';

const API_KEY = '57671668-b0fb5fa9413307bc5c891a87a';

async function getImagesByQuery(query, page = 1) {
  const response = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });

  return response.data;
}

export default getImagesByQuery;