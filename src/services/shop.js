

export const productList = async (page) => {
    const url = `${process.env.REACT_APP_API_URL}/products?per_page=20&page=${page}`
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