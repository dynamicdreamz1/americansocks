import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function Shopfilter({ productCatgory, updateQueryString, setFilters, attributeSize, filters }) {
    const [showFilterBox, setShowFilterBox] = useState(false);

    const handleSearchByHover = (isHovering) => {
        setShowFilterBox(isHovering);
    };

    const valuetext = (value) => {
        return `${value} USD`;
    };


    const handleSizeClick = (id) => {
        setFilters(prevFilters => {
            const updatedSelectSize = prevFilters.selectSize.includes(id) ?
                prevFilters.selectSize.filter(selectedId => selectedId !== id) :
                [...prevFilters.selectSize, id];

            updateQueryString("seize", updatedSelectSize);
            return { ...prevFilters, selectSize: updatedSelectSize };
        });
    };

    const handleSortChange = (event) => {
        const orderBy = event.target.value;
        const order = orderBy === 'date' ? 'desc' : 'asc'; // Set default order based on the selected orderBy value
        setFilters(prevFilters => ({
            ...prevFilters,
            orderBy: orderBy,
            order: order// Include the order in the filters
        }));
        updateQueryString("orderBy", orderBy);
    };


    const handleCategoryChange = (id) => {
        setFilters(prevFilters => {
            const updatedSelectSize = prevFilters.categoryId.includes(id) ?
                prevFilters.categoryId.filter(selectedId => selectedId !== id) :
                [...prevFilters.categoryId, id];

            updateQueryString("categoryId", updatedSelectSize);
            return { ...prevFilters, categoryId: updatedSelectSize };
        });
    };


    // const debounce = (func, delay) => {
    //     let timeoutId;
    //     return function (...args) {
    //         clearTimeout(timeoutId);
    //         timeoutId = setTimeout(() => {
    //             func.apply(this, args);
    //         }, delay);
    //     };
    // };

    // Debounced version of handleChange
    // const debouncedHandleChange = debounce((event, newValue) => {
    //     setFilters(prevFilters => ({
    //         ...prevFilters,
    //         minPrice: newValue[0],
    //         maxPrice: newValue[1]
    //     }));
    //     // Call your API here
    // }, 500);

    const handleChange = (event, newValue) => {
        // debouncedHandleChange(event, newValue);
        setFilters(prevFilters => ({
            ...prevFilters,
            minPrice: newValue[0],
            maxPrice: newValue[1]
        }));
        updateQueryString("price", newValue)
    };



    return (
        <section className="shop_filter">
            <div className="container">
                <div className="shop_wrap_filter">
                    <div className="shop_filter_left">

                        <a href="javascript:void(0)" className="search_btn" onMouseEnter={() => handleSearchByHover(true)} >
                            Search By
                        </a>

                        <div onMouseLeave={() => handleSearchByHover(false)} className="filter_box" style={{ display: showFilterBox ? 'block' : 'none' }}>
                            <div className="filter_box_wrap">
                                <h3 className="filter_title">filter</h3>
                                <div className="accordion_item">
                                    <div className="accrodion_title">
                                        <h4>PRICE</h4>
                                    </div>
                                    <div className="accrodion_content">
                                        <div className="filter_price">
                                            <Box sx={{ width: 400 }}>
                                                <Slider
                                                    getAriaLabel={() => 'Price range'}
                                                    value={[filters.minPrice, filters.maxPrice]}
                                                    onChange={handleChange}
                                                    valueLabelDisplay="auto"
                                                    getAriaValueText={valuetext}
                                                    min={1} // Set the minimum value
                                                    max={15000} // Set the maximum value
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion_item">
                                    <div className="accrodion_title">
                                        <h4>Size</h4>
                                    </div>
                                    <div className="accrodion_content">
                                        <ul className="filter_size">
                                            {attributeSize.map(size => (
                                                <li key={size.id} className={filters.selectSize.includes(size.id) ? 'size selected' : 'size'}>
                                                    <label htmlFor={`size-${size.id}`}>
                                                        <input
                                                            type="checkbox"
                                                            id={`size-${size.id}`}
                                                            className="filter_checkbox"
                                                            checked={filters.selectSize.includes(size.id)}
                                                            onChange={() => handleSizeClick(size.id)}
                                                        />
                                                        <span>{size.name}</span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>

                                <div className="accordion_item">
                                    <div className="accrodion_title">
                                        <h4>color</h4>
                                    </div>
                                    <div className="accrodion_content">
                                        <div className="filter_color">
                                            <span className="color black"></span>
                                            <span className="color yellow"></span>
                                            <span className="color red"></span>
                                            <span className="color purple"></span>
                                            <span className="color darkgreen"></span>
                                            <span className="color blue"></span>
                                            <span className="color green"></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion_item">
                                    <div className="accrodion_title">
                                        <h4>Collection</h4>
                                    </div>
                                    <div className="accrodion_content">
                                        <div className="filter_collection">
                                            {productCatgory.map(category => (
                                                <div key={category.id} className="filter_collection_item">
                                                    <input
                                                        type="checkbox"
                                                        id={category.slug}
                                                        checked={filters.categoryId.includes(category.id)}
                                                        onChange={() => handleCategoryChange(category.id)}
                                                    />
                                                    <label htmlFor={category.slug}>{category.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="sorting">
                        <select value={filters.orderBy} onChange={handleSortChange}>
                            <option value="">Default sorting</option>
                            <option value="date">Date</option>
                            <option value="title">A to Z</option>
                            <option value="id">ID</option>
                            <option value="include">Include</option>
                            <option value="slug">Slug</option>
                            <option value="price">Price</option>
                            <option value="popularity">Popularity</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    )
}
