import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, addToCartProducts } from "../services/order";
import TableHeader from "./TableHead";
import { Skeleton } from "@mui/material";

const Table = ({ loading, handleSort, setLoading, orderdata, setSelectedItems, selectedItems }) => {
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
                    <th>Stock</th>
                    <th>Buy</th>
                </tr>

                <tbody>
                    {orderdata.length > 0 ? (
                        orderdata.map((item, index) => {
                            const correctedVariationJson = item?.variation_json
                                ?.replace(/&quot;/g, '"')
                                .replace(/&lt;/g, "<")
                                .replace(/&gt;/g, ">")
                                .replace(/&amp;/g, "&");
                            let variationData;

                            variationData = correctedVariationJson ? JSON.parse(correctedVariationJson) : [];
                            return (
                                <tr key={index}>
                                    <td data-label="SKU" dangerouslySetInnerHTML={{ __html: item.sku }} />
                                    <td data-label="Image" dangerouslySetInnerHTML={{ __html: item.image }} />
                                    <td data-label="Name" dangerouslySetInnerHTML={{ __html: item.name }}></td>
                                    <td data-label="Categories" dangerouslySetInnerHTML={{ __html: item.categories }}></td>
                                    <td data-label="Price" dangerouslySetInnerHTML={{ __html: item.price }}></td>
                                    <td data-label="Stock" dangerouslySetInnerHTML={{ __html: item.stock }}></td>
                                    <td className={`stoke_buy_data  variation-${variationData.length}`} data-label="Buy">
                                        {" "}
                                        {/* Assuming item has a 'quantity' property */}
                                        <div className={`add-to-cart-btndiv ${variationData.length > 0 ? "" : "add-to-cart-btndiv-two"}`}>
                                            <table className="stoke_info_table_test">
                                                <TableHeader variationData={variationData} />
                                                <tbody>
                                                    {variationData.length > 0 && (
                                                        <tr>
                                                            {variationData.map((data) => {
                                                                return (
                                                                    <>
                                                                        <td>
                                                                            <input
                                                                                type="number"
                                                                                name={`quantity-${data.variation_id}`}
                                                                                className="countsize"
                                                                                // max={parseInt(stockNumber)}
                                                                                min={0}
                                                                                value={(selectedItems.find((selectedItem) => selectedItem.variation_id === data.variation_id) || {}).quantity || 0}
                                                                                onChange={(e) => handleInputChange(e, data, data.attributes.attribute_pa_size, item, index)}
                                                                            />
                                                                        </td>
                                                                    </>
                                                                );
                                                            })}
                                                        </tr>
                                                    )}

                                                    {variationData.length > 0 && (
                                                        <tr>
                                                            {variationData.map((data, index) => {
                                                                const stockNumberMatch = data?.availability_html?.match(/\d+/);
                                                                const stockNumber = stockNumberMatch ? parseInt(stockNumberMatch[0]) : 0;

                                                                // Define the CSS class based on availability
                                                                let availabilityClass = "";
                                                                if (data?.availability_html?.includes("Out of stock")) {
                                                                    availabilityClass = "text-red";
                                                                } else if (data?.availability_html?.includes("Available on backorder")) {
                                                                    availabilityClass = "text-blue";
                                                                } else if (stockNumber > 0) {
                                                                    availabilityClass = "text-green";
                                                                }

                                                                return <td className={availabilityClass} key={index} dangerouslySetInnerHTML={{ __html: data.availability_html }} />;
                                                            })}
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            <button  onClick={() => handleSubmit(variationData.length > 0 ? "" : item, index, item.product_id)}
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
