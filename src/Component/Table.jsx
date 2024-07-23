import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, addToCartProducts } from "../services/order";
import TableHeader from "./TableHead";
import { Skeleton } from "@mui/material";
import ImageThumbnail from "./ImageThumbnail";

const Table = ({checkCustomer, loading, handleSort, setLoading, orderdata, setSelectedItems, selectedItems }) => {
    const [loadingButtonIndex, setLoadingButtonIndex] = useState(null);


    const handleInputChange = (event, data, selectedSize, item, index) => {
        const { value } = event.target;
        let intValue = parseInt(value);
        const maxStockNumber = data.max_qty;
        if (intValue > maxStockNumber && data?.backorders_allowed === false) {
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
            setLoading(false);
            setLoadingButtonIndex(null);
            if (result.cart_hash) {
                document.body.dispatchEvent(new Event('added_to_orderform_cart'));
                //toast.success("Product added to cart successfully!");
            } else {
                toast.error("Sorry, it's not possible to mix Regular Products and Pre-Order Products in the same cart.");
            }
        } catch (error) {
            setLoading(false);
            setLoadingButtonIndex(null);

            toast.error("Error occurred while adding product to cart. Please select Quantity");
        }
    };


    const getAvailabilityDetails = (data) => {
        let availabilityColor = "";
        let availabilityLabel = "";
        let backOrder = "";


        const stockNumberMatch = data?.availability_html?.match(/\d+/);
        const stockNumber = stockNumberMatch ? parseInt(stockNumberMatch[0]) : 0;
    
        if (data.is_pre_order === "yes" && data.is_in_stock === true) {
            availabilityColor = "#5a84c8"; // Blue
            availabilityLabel = "Pre-Order";
        } else if (data.is_in_stock === true && stockNumber <= 20 &&  stockNumber >= 1  ) {
            availabilityColor = "#ff992c"; // Orange
            availabilityLabel = "Last Units";
        } else if (data.backorders_allowed === true && stockNumber === 0) {
            backOrder = "Available on backorder"
            availabilityColor = "#f6c94a"; // Yellow
            availabilityLabel = "Back-Order";
        } else if (data.is_in_stock === false) {
            availabilityColor = "red"; // Red
            availabilityLabel = "Out of Stock";
        } else if (data.is_in_stock === true) {
            availabilityColor = "#0f834d"; // Green
            availabilityLabel = "In Stock";
        }
        

        return { availabilityColor, availabilityLabel ,backOrder };
    };



    return (
        <div className="table-sub">
            {/* <ToastContainer /> */}
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
                            const size = variationData.length > 0 && variationData[0]

                            return (
                                <tr key={index}>
                                    <td data-label="SKU" dangerouslySetInnerHTML={{ __html: item.sku }} />
                                    <td>
                                        <ImageThumbnail imageHtml={item.image} variationData={variationData} />
                                    </td>
                                    <td data-label="Name" dangerouslySetInnerHTML={{ __html: item.name }}></td>
                                    <td data-label="Categories" dangerouslySetInnerHTML={{ __html: item.categories }}></td>
                                    <td data-label="Price" dangerouslySetInnerHTML={{ __html: item.price }}></td>
                                    {/* {showPreoOrder ?
                                        <td>
                                            <div style={{
                                                display: 'inline-block',
                                                backgroundColor: '#01426a',
                                                color: 'white',
                                                fontSize: 'smaller',
                                                padding: '2px 5px',
                                                marginLeft: '5px',
                                                borderRadius: '3px',
                                                fontWeight: 600,
                                                textTransform: "uppercase"

                                            }}>
                                                Pre-Order
                                            </div>
                                        </td>
                                        :
                                        <td data-label="Stock" className="stoct-list-data" dangerouslySetInnerHTML={{ __html: item.stock }}></td>
                                    } */}
                                    <td className={`stoke_buy_data  variation-${variationData.length}`} data-label="Buy">
                                        <div className={`add-to-cart-btndiv ${variationData.length > 0 ? "" : "add-to-cart-btndiv-two"}`}>
                                            <table className="stoke_info_table_test">
                                                <TableHeader variationData={variationData} />
                                                <tbody>
                                                    {variationData.map((data) => {
                                                        const { availabilityColor } = getAvailabilityDetails(data);

                                                        return (
                                                            <td key={data.variation_id} className="">
                                                                <input
                                                                    type="number"
                                                                    name={`quantity-${data.variation_id}`}
                                                                    className="countsize"
                                                                    min={0}
                                                                    value={(selectedItems.find((selectedItem) => selectedItem.variation_id === data.variation_id) || {}).quantity || 0}
                                                                    onChange={(e) => handleInputChange(e, data, data.attributes.attribute_pa_size, item, index)}
                                                                    style={{ borderBottom: `4px solid ${availabilityColor}` }}
                                                                />
                                                            </td>
                                                        );
                                                    })}

                                                    {variationData.length > 0 && (
                                                        <tr>
                                                            {variationData.map((data, index) => {
                                                                const { availabilityLabel } = getAvailabilityDetails(data);

                                                                return (
                                                                    <td style={{ fontWeight: "bold" }} className="variation-type">{availabilityLabel}
                                                                        {/* <span style={{
                                                                            display: "inline-block",
                                                                            height: '17px',
                                                                            width: '17px',
                                                                            borderRadius: "50%",
                                                                            backgroundColor: availabilityColor,
                                                                            border: '2px solid black',
                                                                            position: 'relative',
                                                                            left: '10px',
                                                                            top: '3px'
                                                                        }}>
                                                                        </span> */}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    )}

                                                    {variationData.length > 0 && checkCustomer && (
                                                        <tr>
                                                            {variationData.map((data, index) => {
                                                            const { backOrder } = getAvailabilityDetails(data);

                                                                if (data.availability_html === "") {
                                                                    data.availability_html = backOrder
                                                                }

                                                                return (
                                                                    
                                                                    <td style={{color: 'rgb(0, 0, 0)' }}
                                                                        key={index}
                                                                        dangerouslySetInnerHTML={{ __html: data.availability_html }}
                                                                    />
                                                                );
                                                            })}
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>
                                            <button onClick={() => handleSubmit(variationData.length > 0 ? "" : item, index, item.product_id)}
                                                disabled={selectedItems.some(order => order.product_id === item.product_id) || variationData.length === 0 ? false : true}
                                                className={`add-cart-btn ${loadingButtonIndex === index ? "show_loader" : ""}`}
                                                style={{
                                                    cursor: selectedItems.some(order => order.product_id === item.product_id) || variationData.length === 0 ? "pointer" : "not-allowed"
                                                }}
                                            >
                                                <a href="#" style={{
                                                    cursor: selectedItems.some(order => order.product_id === item.product_id) || variationData.length === 0 ? "pointer" : "not-allowed"
                                                }}>
                                                    add to cart
                                                </a>
                                            </button>
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
                        </>
                    )}
                </tbody>
            </table>
            <div className="loade_wrap">{orderdata.length === 0 && !loading && <h5>No products found. Please reset filters.</h5>}</div>
        </div>
    );
};

export default Table;
