

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