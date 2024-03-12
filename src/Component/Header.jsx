import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate'

const Header = ({ orderCategory, resetFilter, currentPage, orderdata, pageCount, handlePageClick, searchQuery, handleSearch, pageSize, handlePageSizeChange, filteredData, handleCategoryChange, selectedCategory }) => {


  useEffect(() => {

  }, [currentPage])

  
  return (
    <div className="pannel-top-data">
      <div className="pannel-top-left-data">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {orderCategory && Object.keys(orderCategory).map((key) => (
            <option key={key} value={orderCategory[key]}>{orderCategory[key]}</option>
          ))}
        </select>
        <h6 onClick={() => resetFilter()} style={{ cursor: 'pointer' }}>

          {/* <img style={{width:"20px", position:"relative" ,top:"5px"}} src={icon} alt='resetIcon' />  */}
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
        <div className="search-box">
          <h6>search</h6>
          {/* <input type="search" name=""></input> */}
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