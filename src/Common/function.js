

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

