import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { addToCartProducts } from '../services/order';
import { shouldShowAddToCartButton } from '../Common/function';

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const Header = ({setSelectedItems, setSelectedCategory, orderCategory, resetFilter, currentPage, orderdata, pageCount, handlePageClick, searchQuery, handleSearch, pageSize, handlePageSizeChange, filteredData, handleCategoryChange, selectedCategory, selectedItems }) => {

  const [loadingButtonIndex, setLoadingButtonIndex] = useState(false);
  const showAddToCartButton = shouldShowAddToCartButton(selectedItems);

  
  useEffect(() => {

  }, [currentPage])

  const handleSubmit = async (selectedItems) => {

    try {
      let result;
      setLoadingButtonIndex(true);
      result = await addToCartProducts(selectedItems.length > 0 && selectedItems);
      setLoadingButtonIndex(false);
      setSelectedItems([])
      if (result.cart_hash) {
        document.body.dispatchEvent(new Event('added_to_orderform_cart'));
        //toast.success("Product added to cart successfully!");
      } else {
        toast.error("Sorry, it's not possible to mix Regular Products and Pre-Order Products in the same cart.");
      }
    } catch (error) {
      setLoadingButtonIndex(null);
      setSelectedItems([])
      toast.error("Error occurred while adding product to cart. Please select Quantity");
    }
  };

  const renderNestedMenuItems = (categories, selectedCategory, level = 0) => {
    return categories.map((category) => {
      const categoryKey = category.slug;
      const isSelected = selectedCategory.includes(categoryKey);

      return (
        <li key={category.id} style={{ margin : 0, padding : 0 , marginLeft: level * 10 }}>
          <Checkbox
            checked={isSelected}
            onChange={(event) => handleCategoryToggle(event, categoryKey)}
          />
          {category.name}
          {category.children && category.children.length > 0 && (
            <ul style={{listStyle : "none" ,margin : 0, padding : 0 }} className='sub-category'>
              {renderNestedMenuItems(category.children, selectedCategory, level + 1)}
            </ul>
          )}
        </li>
      );
    });
  };
  const handleCategoryToggle = (event, categoryKey) => {
    const newSelectedCategory = [...selectedCategory];
    if (event.target.checked) {
      newSelectedCategory.push(categoryKey);
    } else {
      const index = newSelectedCategory.indexOf(categoryKey);
      if (index > -1) {
        newSelectedCategory.splice(index, 1);
      }
    }
    setSelectedCategory(newSelectedCategory);
  };


  return (
    <div className="pannel-top-data">
      <div className="pannel-top-left-data">
      <FormControl sx={{ m: 1, width: 240 }}>
      <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        className='catagaries-select-box'
        multiple
        value={selectedCategory}
        onChange={handleCategoryChange}
        input={<OutlinedInput label="Categories" />}
        renderValue={(selected) => selected && selected.join(', ')}
        MenuProps={MenuProps}
      >
        <MenuItem>
          <ul className='category-list' style={{margin : 0, padding : 0 }}>
            {orderCategory && renderNestedMenuItems(orderCategory, selectedCategory)}
          </ul>
        </MenuItem>
      </Select>
    </FormControl>

        <h6 onClick={() => resetFilter()} style={{ cursor: 'pointer' }}>
          <i className="fas fa-sync-alt" style={{ width: "31px", position: "relative", top: "2px" }} onClick={resetFilter} />

          Reset</h6>
      </div>
      <div className="pannel-top-center-data">
        <div className="show-data-text">
          <h6>Show</h6>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={orderdata?.length}>All</option>
          </select>
          <h6>per page</h6>
        </div>
        <div className="select-search-box">
          <h6>search</h6>
          <input
            type="search"
            name=""
            value={searchQuery}
            onChange={e => handleSearch(e)}
            placeholder=""
          />
          <h6>Showing {filteredData?.length} products</h6>
        </div>
      </div>

      <div className="pannel-top-right-data">
        {showAddToCartButton &&
          <div className="add-to-cart-btndiv bulk-button">
            <button onClick={() => handleSubmit(selectedItems)}
              className={`add-cart-btn ${loadingButtonIndex ? "show_loader" : ""}`}
              style={{
                cursor: showAddToCartButton ? "pointer" : "not-allowed"
              }}
            >
              <a href="#" style={{
                cursor: showAddToCartButton ? "pointer" : "not-allowed"
              }}>
                BULK ADD
              </a>
            </button>
          </div>
        }
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel={currentPage === pageCount - 1 ? null : "Next >"}
            onPageChange={({ selected }) => handlePageClick(selected)}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel={currentPage === 0 ? null : "< Previous"}
            renderOnZeroPageCount={null}
            activeClassName={'active'}
            containerClassName="pagination-container"
            pageClassName="pagination-page"
            previousClassName={currentPage === 0 ? "pagination-disabled" : ""}
            nextClassName={currentPage === pageCount - 1 ? "pagination-disabled" : ""}
            forcePage={currentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Header