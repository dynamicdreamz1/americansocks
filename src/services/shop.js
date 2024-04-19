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
export const productList = async (page, filters, cancelToken) => {
  try {
    const response = await api.get('/products', {
      params: {
        per_page: 18,
        page: page,
        attribute: 'pa_size',
        attribute_term: filters.selectSize ? filters.selectSize.join(',') : undefined,
        orderby: filters.orderBy || 'date',
        order: filters.order || "desc",
        category: filters.selectSize ? filters.categoryId.join(',') : undefined,
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
        include: filters.include ? filters?.include?.join(',') : ''
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
    const response = await api.get('/products/attributes/1/terms', {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const getProductCategoryList = async () => {
  try {
    const response = await api.get('/products/categories', {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductVariationsList = async (id) => {
  try {
    const response = await api.get(`products/${id}/variations`, {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const relatedProductListApi = async (page, filters, cancelToken) => {
  try {
    const response = await api.get('/products', {
      params: {
        per_page: page,
        slug: filters.slug ? filters.slug :''
      },
      cancelToken: cancelToken
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

