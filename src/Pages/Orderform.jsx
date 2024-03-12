import React, { useEffect, useState } from 'react';
import Header from "../Component/Header";
import Table from "../Component/Table";
import { addToCartProducts, fetchData } from '../services/order';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orderform = () => {
    const [orderdata, setOrderData] = useState([]);
    const [orderCategory, setOrderCategory] = useState();

    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [itemOffset, setItemOffset] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                setLoading(true);
                const result = await fetchData();
                setOrderData(result.data);
                setOrderCategory(result.categories)
                setLoading(false);
            } catch (error) {
                console.error('Error occurred while fetching data:', error);
            }
        };
        fetchDataFromApi();
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    
    const sortedData = () => {
        const sortableData = [...orderdata];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                const valueA = getValue(a, sortConfig.key);
                const valueB = getValue(b, sortConfig.key);
    
                // If sorting by SKU, compare them as strings
                if (sortConfig.key === 'sku') {
                    return sortConfig.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                } else {
                    // For other keys, perform standard comparison
                    if (valueA < valueB) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (valueA > valueB) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                }
            });
        }
        return sortableData;
    };
    
    const getValue = (obj, key) => {
        const keys = key.split('.');
        let value = obj;
        for (const k of keys) {
            value = value[k];
        }
        // If the value is a string containing HTML, extract the text content
        if (typeof value === 'string') {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = value;
            value = tempElement.textContent || tempElement.innerText || '';
        }
        return value;
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(0);
        setItemOffset(0);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0);
        setItemOffset(0);
    };

    const handleCategoryChange = (event) => {
        setCurrentPage(0);
        setSelectedCategory(event.target.value);
        setCurrentPage(0);
        setItemOffset(0);
    };

    const resetFilter = () => {
        setPageSize(10);
        setSearchQuery("");
        setSelectedCategory("All Categories");
        setCurrentPage(0);
        setItemOffset(0);
    };

    const addToCartProductsData = async () => {
        try {
            setLoading(true);
            const result = await addToCartProducts(selectedItems);
            if (result.cart_hash) {
                setLoading(false);
                toast.success("Products added to cart successfully!");
            } else {
                setLoading(false);
                toast.error("Failed to add product to cart.");
            }
        } catch (error) {
            setLoading(false);
            console.error(error.message);
        }
    };

    const Loader = () => (
        loading && (
            <div className="loader-overlay">
                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader-text">Loading...</div>
                </div>
            </div>
        )
    );

    const filteredData = sortedData().filter(item => {
        const nameMatch = item?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const skuMatch = item?.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = selectedCategory === 'All Categories' || item?.categories.toLowerCase().includes(selectedCategory.toLowerCase());
        return (nameMatch || skuMatch) && categoryMatch;
    });

    const pageCount = Math.ceil(filteredData.length / pageSize);

    const handlePageClick = (selected) => {
        const offset = selected * pageSize;
        setCurrentPage(selected);
        setItemOffset(offset);
    };

    const paginatedData = filteredData.slice(itemOffset, itemOffset + pageSize);


    return (
        <>
            <div className='table-panel-main'>
                <ToastContainer />
                <Loader />
                <Header
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    handlePageSizeChange={handlePageSizeChange}
                    handleCategoryChange={handleCategoryChange}
                    pageSize={pageSize}
                    selectedCategory={selectedCategory}
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                    itemOffset={itemOffset}
                    orderdata={orderdata}
                    orderCategory={orderCategory}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    resetFilter={resetFilter}
                    // Pass the handleSort function to the Header component
                />
                <Table  handleSort={handleSort} setSelectedItems={setSelectedItems} selectedItems={selectedItems} setLoading={setLoading} orderdata={paginatedData} />
            </div>
        </>
    );
};

export default Orderform;
