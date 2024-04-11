

export const productList = async (page,filters) => {
  const url = new URL(`${process.env.REACT_APP_API_URL}/products`);
  url.searchParams.append('per_page', '20');
  url.searchParams.append('page', page);

  if (filters.selectSize) {
    url.searchParams.append('attribute', 'pa_size');
    url.searchParams.append('attribute_term', filters.selectSize.join(','));
  }


  const cunsumerKey = process.env.REACT_APP_CONSUMER_KEY;
  const cunsumerSecret = process.env.REACT_APP_CONSUMER_SECRET;

  const auth = btoa(`${cunsumerKey}:${cunsumerSecret}`);
  const headers = new Headers();
  headers.append("Authorization", `Basic ${auth}`);
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};


export const getProductAttribute = async () => {
  const url = `${process.env.REACT_APP_API_URL}/products/attributes/1/terms`
  const cunsumerKey = process.env.REACT_APP_CONSUMER_KEY;
  const cunsumerSecret = process.env.REACT_APP_CONSUMER_SECRET;

  const auth = btoa(`${cunsumerKey}:${cunsumerSecret}`);
  const headers = new Headers();
  headers.append("Authorization", `Basic ${auth}`);
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};