import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Table from "../Component/Table";
import { fetchData } from "../services/order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkInventoryData } from "../Common/function";

const Orderform = () => {
  const [orderdata, setOrderData] = useState([]);
  const [orderCategory, setOrderCategory] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(); // Default page size
  // const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [checkCustomer, setcheckCustomer] = useState(false);
  const [checkCookie, setCheckCookie] = useState({});



  function checkVisitData(visitdata, capsData) {
    // Initialize the flag as false
    let flag = false;

    // Check if visitdata is not null and is an array
    if (visitdata && Array.isArray(visitdata)) {
      // Check if the array contains either 'administrator' or 'product_editor'
      if (visitdata.includes('administrator') || visitdata.includes('product_editor')) {
        flag = true;
      }
    }
    if (capsData && capsData?.salesking_role_none) {
      flag = true;
    }

    return flag;
  }



  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setLoading(true);
        const result = await fetchData();
        const inventoryData = checkInventoryData(result?.cookie_new, document.cookie)

        setCheckCookie(parseInt(inventoryData));
        setOrderData(result.data);
        setPageSize(result.data.length)
        setOrderCategory(result.product_categories_new);
        const customer = checkVisitData(result.user_data, result.user_caps);
        setcheckCustomer(customer)
        setLoading(false);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };
    fetchDataFromApi();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
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
        if (sortConfig.key === "sku") {
          return sortConfig.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
          // For other keys, perform standard comparison
          if (valueA < valueB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableData;
  };

  const getValue = (obj, key) => {
    const keys = key.split(".");
    let value = obj;
    for (const k of keys) {
      value = value[k];
    }
    // If the value is a string containing HTML, extract the text content
    if (typeof value === "string") {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = value;
      value = tempElement.textContent || tempElement.innerText || "";
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
    if (event.target.value && event.target.value.every(value => value !== undefined)) {
      setSelectedCategory(event.target.value);
    }
    setItemOffset(0);
  };


  const resetFilter = () => {
    setPageSize(10);
    setSearchQuery("");
    setSelectedCategory([]);
    setCurrentPage(0);
    setItemOffset(0);
  };

  const filteredData = sortedData().filter((item) => {
    const nameMatch = item?.name?.toLowerCase().includes(searchQuery?.toLowerCase());
    const skuMatch = item?.sku?.toLowerCase().includes(searchQuery?.toLowerCase());
    const categoryMatch = selectedCategory.length === 0 || selectedCategory.every(cat => item?.categories?.toLowerCase().includes(cat?.toLowerCase()));
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
      <div className="table-panel-main">
        <ToastContainer />
        {/* <Loader /> */}
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
          selectedItems={selectedItems}
          setSelectedCategory={setSelectedCategory}


        />
        <Table
          loading={loading}
          handleSort={handleSort}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
          setLoading={setLoading}
          orderdata={paginatedData}
          checkCustomer={checkCustomer}
          checkCookie={checkCookie}
        />
      </div>
    </>
  );
};

export default Orderform;
