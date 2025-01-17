

export const getQueryStringParams = () => {
    const queryString = window.location.search.substring(1);
    const urlParams = new URLSearchParams(queryString);
    const data = {};

    for (const [key, value] of urlParams.entries()) {
        if (value.includes(",")) {
            data[key] = value.split(",");
        } else {
            data[key] = [value]; // Wrap the value in an array
        }
    }

    return data;
};

export const shouldShowAddToCartButton = (products) => {
  if (products.length <= 1) {
    return false;
  }
  
  const productIds = products.map(product => product.product_id);
  const uniqueProductIds = new Set(productIds);

  return uniqueProductIds.size > 1;
};



export const  calculateTotalQuantity =(items, productId) => {
    let totalQuantity = 0;
    items.forEach(item => {
        if (item.product_id === productId) {
            totalQuantity += item.quantity;
        }
    });
    return totalQuantity;
}

export const  findDataById = (ids, data) => {
    const result = [];
    ids.forEach(id => {
        const found = data.find(item => item.id === id);
        if (found) {
            result.push(found);
        }
    });
    return result;
}

export const  convertToHierarchy = (data) => {
    const map = new Map();
    const result = [];

    // Create a map of id to object
    data.forEach(obj => {
        map.set(obj.id, { ...obj, children: [] });
    });

    // Iterate over the data to add children to their respective parents
    map.forEach(childObj => {
        if (childObj.parent !== 0) {
            const parentObj = map.get(childObj.parent);
            if (parentObj) {
                parentObj.children.push(childObj);
            }
        } else {
            result.push(childObj);
        }
    });

    return result;
}


export const getStatusClass = (status) => {
      switch (status) {
      case 'instock':
        return 'green';
      case 'outofstock':
        return 'red';
      case 'onbackorder':
        return 'yellow';
      default:
        return 'blue';
    }
  };

  export const getStatusText = (status) => {
    switch (status) {
      case 'instock':
        return `In Stock units`;
      case 'outofstock':
        return 'Out of Stock';
      case 'onbackorder':
        return 'Back-order';
      default:
        return 'Pre-order';
    }
  };



  export const checkInventoryData = (jsonData, cookies) => {    
    // First check in JSON data
    if (jsonData && jsonData.woocommerce_multi_inventory_inventory) {
      return jsonData.woocommerce_multi_inventory_inventory;
    }
    
    // If not found in JSON, check in cookies
    if (cookies && cookies.woocommerce_multi_inventory_inventory) {
      return cookies.woocommerce_multi_inventory_inventory;
    }
    
    // If not found in either, return null
    return "186";
  };
  