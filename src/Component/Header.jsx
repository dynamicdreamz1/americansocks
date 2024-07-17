import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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


const Header = ({ orderCategory, resetFilter, currentPage, orderdata, pageCount, handlePageClick, searchQuery, handleSearch, pageSize, handlePageSizeChange, filteredData, handleCategoryChange, selectedCategory }) => {


  useEffect(() => {

  }, [currentPage])


  return (
    <div className="pannel-top-data">
      <div className="pannel-top-left-data">
        <FormControl sx={{ m: 1, width: 200  }}>
          <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            className='catagaries-select-box'
            multiple
            value={selectedCategory}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) =>selected && selected?.join(', ')}
            MenuProps={MenuProps}
          >
            {orderCategory && Object.keys(orderCategory).map((key) => (
              <MenuItem key={key} value={key}>
                <Checkbox checked={selectedCategory.includes(key)} />
                <ListItemText primary={orderCategory[key]} />
              </MenuItem>
            ))}
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