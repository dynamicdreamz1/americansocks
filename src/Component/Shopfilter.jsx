import React from 'react'

export default function Shopfilter({setProducts, setFilters, attributeSize,filters }) {

    const handleSizeClick = (id) => {
        setProducts([])
        setFilters(prevFilters => {
            if (prevFilters.selectSize.includes(id)) {
                return { ...prevFilters, selectSize: prevFilters.selectSize.filter(selectedId => selectedId !== id) };
            } else {
                return { ...prevFilters, selectSize: [...prevFilters.selectSize, id] };
            }
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
                                                <li key={size.id}>
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
                                            <p>SS24</p>
                                            <p>FW23</p>
                                            <p>SS23</p>
                                            <p>FW22</p>
                                            <p>SS22</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="sorting">
                        <select >
                            <option >Default sorting</option>
                            <option >Date</option>
                            <option >A to Z</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    )
}
