import React, { useState } from 'react'

export default function Shopfilter({ productCatgory, updateQueryString, setFilters, attributeSize, filters }) {


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


    return (
        <section className="shop_filter">
            <div className="container">
                <div className="shop_wrap_filter">
                    <div className="shop_filter_left">

                        <a href="javascript:void(0)" className="search_btn">
                            Search By
                        </a>

                        <div className="filter_box">
                            <div className="filter_box_wrap">
                                <h3 className="filter_title">FILTROS</h3>
                                <div className="accordion_item">
                                    <div className="accrodion_title">
                                        <h4>PRECIOS</h4>
                                    </div>
                                    <div className="accrodion_content">
                                        <div className="filter_price">
                                            <input type="range" id="vol" name="vol" min="0" max="100" />
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion_item">
                                    <div className="accrodion_title">
                                        <h4>TALLA</h4>
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
                                        <h4>COLECCIÓN</h4>
                                    </div>
                                    <div className="accrodion_content">
                                        <div className="filter_collection">
                                            {productCatgory.map(category => (
                                                <div key={category.id}>
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
