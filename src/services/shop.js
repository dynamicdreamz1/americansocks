import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  auth: {
    username: process.env.REACT_APP_CONSUMER_KEY,
    password: process.env.REACT_APP_CONSUMER_SECRET
  }
});

// Define your productList function
export const productList = async (page, filters,cancelToken) => {
    try {
    const response = await api.get('/products', {
      params: {
        per_page: 20,
        page: page,
        attribute: 'pa_size' ,
        attribute_term: filters.selectSize ? filters.selectSize.join(',') : undefined,
        orderby: filters.orderBy || 'date',
        order : filters.order || "desc",
        category : filters.selectSize ? filters.categoryId.join(',') : undefined,
        min_price:filters.minPrice,
        max_price :filters.maxPrice
      },
      cancelToken: cancelToken
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Define getProductAttribute function
export const getProductAttribute = async () => {
  try {
    const response = await api.get('/products/attributes/1/terms');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const getProductCategoryList = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};