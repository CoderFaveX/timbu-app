import axios from 'axios';

const API_URL = 'https://api.timbu.cloud';
const APP_ID = 'I57OGRYLKNR58LI';
const API_KEY = 'f46d86ecc55248b68e66d2173b963f6920240704222104089766';
const ORGANIZATION_ID = '52edf5b13b0d41a5a611d4be30757c18';

export const fetchProducts = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: {
        organization_id: ORGANIZATION_ID,
        page,
        size,
        Appid: APP_ID,
        Apikey: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
