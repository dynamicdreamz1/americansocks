import axios from 'axios';

// Create an Axios instance for fetching data
export const fetchDataInstance = axios.create({
  baseURL: 'https://dddemo.net/wordpress/2024/americansocks/wp-admin/admin-ajax.php',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});



// Function to fetch data
export const fetchData = async () => {
  try {
    const response = await fetchDataInstance.post('', "length=300&table_id=wcpt_18e254f318f6543c_1&action=orderform_fetch_products&dev=16");
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to add to cart
export const addToCart = async (data) => {
  try {
    const response = await fetchDataInstance.post('', `quantity=${data.quantity}&product_id=${data.product_id}&action=${data.action}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to add multiple items to cart
export const addToCartProducts = async (products) => {
  let raw = '';
  products.forEach((product, index) => {
    raw += `cart_data[p${product.selectedSize ? product.selectedSize : "s-m"}__${product.product_id}][quantity]=${product.quantity ? product.quantity : '1'}`;
    if (product.variation_id) {
      raw += `&cart_data[p${product.selectedSize ? product.selectedSize : "s-m"}__${product.product_id}][variation_id]=${product.variation_id}`;
    }
    raw += `&cart_data[p${product.selectedSize ? product.selectedSize : "s-m"}__${product.product_id}][attribute_pa_size]=${product.selectedSize ? product.selectedSize : "s-m"}`;
    if (index !== products.length - 1) {
      raw += "&";
    }
  });
  raw += "&action=wcpt_add_to_cart_multi";

  try {
    const response = await fetchDataInstance.post('', raw);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add products to cart");
  }
};
