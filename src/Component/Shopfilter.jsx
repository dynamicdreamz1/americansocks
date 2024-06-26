import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { convertToHierarchy, findDataById } from '../Common/function';


export default function Shopfilter({ productCatgory, updateQueryString, setFilters, attributeSize, filters }) {
    const getAttribute = findDataById(filters.selectSize, attributeSize)
    const getProductCategory = findDataById(filters.categoryId, productCatgory)
    const [isOpen, setIsOpen] = useState(false);


    const [showFilterBox, setShowFilterBox] = useState(false);

    const handleSearchByHover = () => {
        setShowFilterBox(!showFilterBox);
    };

    const valuetext = (value) => {
        return `${value} USD`;
    };


    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setIsOpen(isExpanded ? panel : false);
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



    const handleChange = (event, newValue) => {
        // debouncedHandleChange(event, newValue);
        setFilters(prevFilters => ({
            ...prevFilters,
            minPrice: newValue[0],
            maxPrice: newValue[1]
        }));
        updateQueryString("price", newValue)
    };

  
      
      

    const hierarchicalData = convertToHierarchy(productCatgory);

    function renderCategories(categories) {
        return (
            <>
                {categories.map(category => (
                    <div key={category.id} className="filter_collection_item">
                        <input
                            type="checkbox"
                            id={category.slug}
                            checked={filters.categoryId.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                        />
                        <label htmlFor={category.slug}>{category.name}</label>
                        {category?.children?.length > 0 && (
                            <div className="child_category_wrap">
                                {category.children.map(childCategory => (
                                    <div key={childCategory.id} className="filter_collection_item child-category">
                                        <input
                                            type="checkbox"
                                            id={childCategory.slug}
                                            checked={filters.categoryId.includes(childCategory.id)}
                                            onChange={() => handleCategoryChange(childCategory.id)}
                                        />
                                        <label htmlFor={childCategory.slug}>{childCategory.name}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </>
        );
    }




    return (
        <section className="shop_filter">
            <div className="container">
                <div className="shop_wrap_filter">
                    <div className="shop_filter_left">

                        <button className="search_btn" onClick={() => handleSearchByHover()} >
                            Search By
                        </button>

                        <div className="filter_box" style={{ display: showFilterBox ? 'block' : 'none' }}>
                            <div className="filter_box_wrap">
                                <div className="accordion_item">
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <div className="accrodion_title">
                                                <h4>PRICE</h4>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
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
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                                <div className="accordion_item">
                                    <Accordion expanded={isOpen === 'panel1'} onChange={handleAccordionChange('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <div className="accrodion_title">
                                                <h4>Size</h4>
                                            </div>
                                            {isOpen === 'panel1' &&
                                                <Stack direction="row" spacing={1}>
                                                    {getAttribute.map(item => (
                                                        <Chip
                                                            key={item.id}
                                                            label={item.name}
                                                            onDelete={() => handleSizeClick(item.id)}
                                                        />
                                                    ))}
                                                </Stack>
                                            }
                                        </AccordionSummary>
                                        <AccordionDetails>
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
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                                <div className="accordion_item">
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <div className="accrodion_title">
                                                <h4>color</h4>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
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
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                                <div className="accordion_item">

                                    <Accordion expanded={isOpen === 'panel2'} onChange={handleAccordionChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <div className="accrodion_title">
                                                <h4>Collection</h4>
                                            </div>
                                            {isOpen === 'panel2' &&
                                                <Stack direction="row" spacing={1}>
                                                    {getProductCategory.map(item => (
                                                        <Chip
                                                            key={item.id}
                                                            label={item.name}
                                                            onDelete={() => handleCategoryChange(item.id)}
                                                        />
                                                    ))}
                                                </Stack>
                                            }
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="accrodion_content">
                                                <div className="filter_collection">
                                                {renderCategories(hierarchicalData)}
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>


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
