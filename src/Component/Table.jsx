import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, addToCartProducts } from "../services/order";
import TableHeader from "./TableHead";
import { Box, Modal, Skeleton, Typography } from "@mui/material";
import ImageThumbnail from "./ImageThumbnail";
import MyIcon from './MyIcon';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
};


const Table = ({ checkCookie, checkCustomer, loading, handleSort, setLoading, orderdata, setSelectedItems, selectedItems }) => {
    const [loadingButtonIndex, setLoadingButtonIndex] = useState(null);


    const handleInputChange = (event, data, selectedSize, item, index) => {
        const { value } = event.target;
        let intValue = parseInt(value);
        if (data?.is_in_stock === false) {
            intValue = 0;
        }
        const isSelected = selectedItems.some((selectedItem) => selectedItem.variation_id === data.variation_id && selectedItem.selectedSize === selectedSize);

        if (intValue === 0) {
            // If the quantity is 0, remove the object from selectedItems
            const updatedSelectData = selectedItems.filter((selectedItem) => !(selectedItem.variation_id === data.variation_id && selectedItem.selectedSize === selectedSize));
            setSelectedItems(updatedSelectData);
        } else {
            if (isSelected) {
                // If already selected, update the quantity
                const updatedSelectData = selectedItems.map((selectedItem) => {
                    if (selectedItem.variation_id === data.variation_id && selectedItem.selectedSize === selectedSize) {
                        return {
                            ...selectedItem,
                            quantity: intValue,
                        };
                    }
                    return selectedItem;
                });
                setSelectedItems(updatedSelectData);
            } else {
                // If not selected and quantity is greater than 0, add to selectedItems
                if (intValue > 0) {
                    setSelectedItems((prevSelectData) => [
                        ...prevSelectData,
                        {
                            variation_id: data.variation_id,
                            selectedSize: selectedSize,
                            quantity: intValue,
                            product_id: item.product_id,
                        },
                    ]);
                }
            }
        }
    };

    const handleSubmit = async (item, index, id) => {

        try {
            let result;
            setLoading(true);
            setLoadingButtonIndex(index);
            if (item) {
                const object = {
                    quantity: 1,
                    action: "wcpt_add_to_cart",
                    product_id: item.product_id,
                };
                result = await addToCart(object);
            } else {
                const selectedData = selectedItems.filter(order => order.product_id === id)
                result = await addToCartProducts(selectedItems.length > 0 && selectedData);
            }
            setSelectedItems([])            
            setLoading(false);
            setLoadingButtonIndex(null);
            if (result.cart_hash) {
                document.body.dispatchEvent(new Event('added_to_orderform_cart'));
                //toast.success("Product added to cart successfully!");
            } else {
                toast.error(<div dangerouslySetInnerHTML={{ __html: result.error_message }}  ></div>);
            }
        } catch (error) {
            setLoading(false);
            setLoadingButtonIndex(null);
            setSelectedItems([])

            toast.error("Error occurred while adding product to cart. Please select Quantity");
        }
    };


    const getAvailabilityDetails = (data, product) => {
        let availabilityColor = "";
        let availabilityLabel = "";
        let backOrder = "";

        const variationId = data.variation_id;


        const checkCookieValue = product?.inventory_json[variationId];
        let stockNumber = parseInt(checkCookieValue?.[checkCookie]) || 0;

        // Normalize stockNumber for invalid values like negative numbers or NaN
        if (isNaN(stockNumber) || stockNumber < 0) {
            stockNumber = 0;
        }

        // Determine availability details
        if (data.is_pre_order === "yes" && data.is_in_stock === true) {
            availabilityColor = "#5a84c8"; // Blue
            availabilityLabel = "Pre-Order";
        } else if (data.is_in_stock === true && stockNumber <= 20 && stockNumber >= 1) {
            availabilityColor = "#ff992c"; // Orange
            availabilityLabel = "Last Units";
        } else if (data.backorders_allowed === true && stockNumber === 0) {
            backOrder = "Available on backorder";
            availabilityColor = "#673AB7"; // Yellow
            availabilityLabel = "Back-Order";
        } else if (data.is_in_stock === false || stockNumber <= 0) {
            availabilityColor = "red"; // Red
            availabilityLabel = "Out of Stock";
        } else if (data.is_in_stock === true) {
            availabilityColor = "#0f834d"; // Green
            availabilityLabel = "In Stock";
        }

        // Return all availability details including stock number
        return { availabilityColor, availabilityLabel, backOrder, stockNumber };
    };




    return (
        <div className="table-sub">
            <table>
                <tr>
                    <th onClick={() => handleSort("sku")}>
                        SKU
                        <div className="caret-icon">
                            <i className="fa fa-caret-up" aria-hidden="true"></i>
                        </div>
                    </th>
                    <th>Image</th>
                    <th onClick={() => handleSort("name")}>
                        Name
                        <div className="caret-icon multipel-caret-icon">
                            <i className="fa fa-caret-up" aria-hidden="true"></i>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                    </th>
                    <th>Categories</th>
                    <th onClick={() => handleSort("price")}>
                        Price
                        <div className="caret-icon multipel-caret-icon">
                            <i className="fa fa-caret-up" aria-hidden="true"></i>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                    </th>
                    {/* <th>Stock</th> */}
                    <th>Buy</th>
                </tr>

                <tbody>
                    {orderdata.length > 0 ? (
                        orderdata.map((item, index) => {
                            const correctedVariationJson = item?.variation_json?.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                            let variationData;

                            variationData = correctedVariationJson ? JSON.parse(correctedVariationJson) : [];
                            const preAndBackdate = item.ywpo_preorder_json ? JSON.parse(item.ywpo_preorder_json) : [];
                            const dateColor = variationData.some(data => getAvailabilityDetails(data, item).backOrder) ? "#673AB7" : "#5a84c8"

                            return (
                                <tr key={index}>
                                    <td data-label="SKU" dangerouslySetInnerHTML={{ __html: item.sku }} />
                                    <td>
                                        <ImageThumbnail imageHtml={item.image} variationData={variationData} />
                                    </td>
                                    <td data-label="Name" dangerouslySetInnerHTML={{ __html: item.name }}></td>
                                    <td data-label="Categories" dangerouslySetInnerHTML={{ __html: item.categories }}></td>
                                    <td data-label="Price" dangerouslySetInnerHTML={{ __html: item.price }}></td>
                                    <td className={`stoke_buy_data  variation-${variationData.length}`} data-label="Buy">
                                        <div className={`add-to-cart-btndiv ${variationData.length > 0 ? "" : "add-to-cart-btndiv-two"}`}>
                                            <table className="stoke_info_table_test">
                                                <TableHeader variationData={variationData} />
                                                <tbody>
                                                    {variationData.map((data) => {
                                                        const { availabilityColor, availabilityLabel } = getAvailabilityDetails(data, item);

                                                        return (
                                                            <td key={data.variation_id} className="">
                                                                <input
                                                                    type="number"
                                                                    name={`quantity-${data.variation_id}`}
                                                                    disabled={availabilityLabel === "Out of Stock" ? true : false}
                                                                    className="countsize"
                                                                    min={0}
                                                                    value={(selectedItems.find((selectedItem) => selectedItem.variation_id === data.variation_id) || {}).quantity || 0}
                                                                    onChange={(e) => handleInputChange(e, data, data.attributes.attribute_pa_size, item, index)}
                                                                    style={{ borderBottom: `4px solid ${availabilityColor}`, cursor: availabilityLabel === "Out of Stock" ? "not-allowed" : "default" }}
                                                                />
                                                            </td>
                                                        );
                                                    })}

                                                    {variationData.length > 0 && (
                                                        <tr>
                                                            {variationData.map((data, index) => {
                                                                const { availabilityLabel } = getAvailabilityDetails(data, item);

                                                                return (
                                                                    <td style={{ fontWeight: "bold" }} className="variation-type">{availabilityLabel}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    )}

                                                    {variationData.length > 0 && checkCustomer && (
                                                        <tr>
                                                            {variationData.map((data, index) => {
                                                                const { stockNumber } = getAvailabilityDetails(data, item);

                                                                return (
                                                                    data.availability_html &&
                                                                    <td style={{ color: 'rgb(0, 0, 0)' }}
                                                                        key={index}
                                                                    // dangerouslySetInnerHTML={{ __html: data.availability_html }}
                                                                    >{stockNumber}</td>
                                                                );
                                                            })}
                                                        </tr>
                                                    )}


                                                </tbody>
                                            </table>
                                            <div className={`orderform-wrapper ${preAndBackdate?._ywpo_preorder_no_date_label ? "preorder-label" : ""}`}>
                                                {preAndBackdate?._ywpo_preorder_no_date_label &&
                                                    <div className="date-label" style={{ backgroundColor: dateColor }}>
                                                        <MyIcon color={dateColor} />
                                                        <p>{preAndBackdate?._ywpo_preorder_no_date_label}</p>
                                                    </div>}

                                                <button onClick={() => handleSubmit(variationData.length > 0 ? "" : item, index, item.product_id)}
                                                    disabled={selectedItems.some(order => order.product_id === item.product_id) || variationData.length === 0 ? false : true}
                                                    className={`add-cart-btn ${loadingButtonIndex === index ? "show_loader" : ""}`}
                                                    style={{
                                                        cursor: selectedItems.some(order => order.product_id === item.product_id) || variationData.length === 0 ? "pointer" : "not-allowed"
                                                    }}
                                                >
                                                    <a style={{
                                                        cursor: selectedItems.some(order => order.product_id === item.product_id) || variationData.length === 0 ? "pointer" : "not-allowed"
                                                    }}>
                                                        add to cart
                                                    </a>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <>
                            {loading &&
                                Array.from({ length: 13 }, (_, index) => (
                                    <tr key={index}>
                                        {Array.from({ length: 7 }, (_, index) => (
                                            <td key={index} colSpan="1">
                                                <Skeleton variant="rectangular" height={48} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                            <Modal
                                open={loading}
                                // onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                        We're loading a ton of data, bear with us  😊
                                    </Typography>
                                </Box>
                            </Modal>
                        </>
                    )}
                </tbody>
            </table>
            <div className="loade_wrap">{orderdata.length === 0 && !loading && <h5>No products found. Please reset filters.</h5>}</div>
        </div>
    );
};

export default Table;
