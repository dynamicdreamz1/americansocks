import React, { useEffect, useState } from 'react'
import Shopfilter from "../Component/Shopfilter"
import ShopList from "../Component/ShopList"
import { getQueryStringParams } from "../Common/function"
import { productList, getProductAttribute, getProductCategoryList } from '../services/shop'; // Import the api instance and functions
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Skeleton  from '../Component/Skeleton';
import axios from 'axios';
// import Loader from '../Component/Loader';



const ShopComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProducts] = useState([])
    const [productCatgory, setProductCatgory] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    // const [loading, setLoading] = useState(false);
    const [attributeSize, setAttributeSize] = useState([]);
    const queryParams = getQueryStringParams()


    const [filters, setFilters] = useState({
        selectSize: queryParams?.seize?.map(Number) || [],
        orderBy: queryParams?.orderBy && queryParams?.orderBy[0] || "",
        order: queryParams?.orderBy && queryParams?.orderBy[0] === 'date' ? 'desc' : 'asc',
        categoryId: queryParams?.categoryId?.map(Number) || [],
        minPrice : 1,
        maxPrice : 15000
    });

    console.log("filters",filters);

    const updateQueryString = (param, value) => {
        const currentQuery = queryString.parse(location.search, { arrayFormat: 'comma' });
        if (Array.isArray(value)) {
            currentQuery[param] = value;
        } else if (typeof value === 'string') {
            currentQuery[param] = value.split(',');
        } else {
            currentQuery[param] = value?.toString();
        }

        const newQueryString = queryString.stringify(currentQuery, { arrayFormat: 'comma' });
        navigate(`${location.pathname}?${newQueryString}`);
    }

    useEffect(() => {
        setCurrentPage(1);
        setProducts([])
    }, [filters]);


    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            // setLoading(true)
            const result = await productList(currentPage, filters,source.token);
            setProducts(prevProducts => [...prevProducts, ...result]);
            // if (result) {
            //     setLoading(false)
            // }
        }

        fetchData();

        return () => {
            source.cancel('Component unmounted');
          };
    }, [currentPage, filters]);


    useEffect(() => {
        const fetchData = async () => {
            const resultAttribute = await getProductAttribute();
            setAttributeSize(resultAttribute.map(({ id, name, slug }) => ({ id, name, slug })));

            const resultCategory = await getProductCategoryList();
            setProductCatgory(resultCategory);
        };

        fetchData();
    }, []);


    return (
        <>
            <Shopfilter
                filters={filters}
                attributeSize={attributeSize}
                setFilters={setFilters}
                updateQueryString={updateQueryString}
                productCatgory={productCatgory}
            />
            {/* <Loader loading={loading}  /> */}
            <ShopList product={product} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default ShopComponent