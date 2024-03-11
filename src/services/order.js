export const fetchData = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json, text/javascript, */*; q=0.01");
    myHeaders.append("content-type", "application/x-www-form-urlencoded; charset=UTF-8");

    const raw = "length=300&table_id=wcpt_a3c0f79a43ed08c5_1&action=orderform_fetch_products&dev=1";

    //   const raw = "table_id=wcpt_a3c0f79a43ed08c5_1&action=wcpt_load_products";

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("https://pro.americansocks.com/wp-admin/admin-ajax.php", requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export  const addToCart = async (data) => {
  const myHeaders = new Headers();
  myHeaders.append("content-type", "application/x-www-form-urlencoded; charset=UTF-8");

  const raw = `quantity=${data.quantity}&product_id=${data.product_id}&action=${data.action}`;

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  try {
      const response = await fetch("https://pro.americansocks.com/wp-admin/admin-ajax.php", requestOptions);
      const result = await response.json();
      return  result;
  } catch (error) {
      console.error(error);
  }
};


export const addToCartProducts = async (products) => {
  const myHeaders = new Headers();
  myHeaders.append("content-type", "application/x-www-form-urlencoded; charset=UTF-8");

  let raw = "";
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

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://pro.americansocks.com/wp-admin/admin-ajax.php", requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add products to cart");
  }
};