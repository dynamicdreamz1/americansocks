import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, addToCartProducts } from '../services/order';
import TableHeader from './TableHead';

const Table = ({ handleSort, setLoading, orderdata, setSelectedItems, selectedItems }) => {


    const handleInputChange = (event, data, selectedSize, item) => {
        console.log("item", item);
        const { value } = event.target;
        const intValue = parseInt(value);

        // Check if the variation is already selected
        const isSelected = selectedItems.some(selectedItem => selectedItem.variation_id === data.variation_id && selectedItem.selectedSize === selectedSize);

        if (intValue === 0) {
            // If the quantity is 0, remove the object from selectedItems
            const updatedSelectData = selectedItems.filter(selectedItem => !(selectedItem.variation_id === data.variation_id && selectedItem.selectedSize === selectedSize));
            setSelectedItems(updatedSelectData);
        } else {
            if (isSelected) {
                // If already selected, update the quantity
                const updatedSelectData = selectedItems.map(selectedItem => {
                    if (selectedItem.variation_id === data.variation_id && selectedItem.selectedSize === selectedSize) {
                        return {
                            ...selectedItem,
                            quantity: intValue
                        };
                    }
                    return selectedItem;
                });
                setSelectedItems(updatedSelectData);
            } else {
                // If not selected and quantity is greater than 0, add to selectedItems
                if (intValue > 0) {
                    setSelectedItems(prevSelectData => [...prevSelectData, {
                        variation_id: data.variation_id,
                        selectedSize: selectedSize,
                        quantity: intValue,
                        product_id: item.product_id
                    }]);
                }
            }
        }
    };



    const handleSubmit = async (item) => {
        try {
            let result;
            setLoading(true);

            if (item) {
                const object = {
                    quantity: 1,
                    action: 'wcpt_add_to_cart',
                    product_id: item.product_id
                }
                result = await addToCart(object);

            } else {
                result = await addToCartProducts(selectedItems.length > 0 && selectedItems);
            }
            setLoading(false);

            if (result.cart_hash) {
                // If successful response, show success toast
                toast.success("Product added to cart successfully!");
            } else {
                // If failed response, show error toast
                toast.error("Failed to add product to cart.");
            }
        } catch (error) {
            setLoading(false);
            // If there's an error, show error toast
            toast.error("Error occurred while adding product to cart. Please select Quantity");
        }
    };

    return (
        <div className="table-sub">
            {/* <ToastContainer /> */}
            <table>
                <tr>
                    <th onClick={() => handleSort("sku")} >
                        SKU
                        <div className="caret-icon">
                            <i className="fa fa-caret-up" aria-hidden="true"></i>
                        </div>
                    </th>
                    <th>Image</th>
                    <th onClick={() => handleSort("name")}>Name
                        <div className="caret-icon multipel-caret-icon">
                            <i className="fa fa-caret-up" aria-hidden="true"></i>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                    </th>
                    <th>Categories</th>
                    <th onClick={() => handleSort("price")}>Price
                        <div className="caret-icon multipel-caret-icon">
                            <i className="fa fa-caret-up" aria-hidden="true"></i>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                    </th>
                    <th>Stock</th>
                    <th>Buy</th>
                </tr>

                <tbody>
                    {orderdata.map((item, index) => {
                        const variationData = item?.variation_json && JSON.parse(item?.variation_json)
                        return (
                            <tr key={index}>
                                <td data-label="SKU" dangerouslySetInnerHTML={{ __html: item.sku }} />
                                <td data-label="Image" dangerouslySetInnerHTML={{ __html: item.image }} />
                                <td data-label="Name" dangerouslySetInnerHTML={{ __html: item.name }}></td>
                                <td data-label="Name" dangerouslySetInnerHTML={{ __html: item.categories }}></td>
                                <td data-label="Name" dangerouslySetInnerHTML={{ __html: item.price }}></td>
                                <td data-label="Name" dangerouslySetInnerHTML={{ __html: item.stock }}></td>
                                <td className="stoke_buy_data" data-label="Buy"> {/* Assuming item has a 'quantity' property */}
                                    <div className={`add-to-cart-btndiv ${variationData.length > 0 ? '' : 'add-to-cart-btndiv-two'}`}>


                                        <table className='stoke_info_table'>

                                            {/* <TableHeader variationData={variationData} /> */}
                                            <tbody>
                                                {/* <tr>
                                                        <td>S size</td>
                                                        <td className='stock_number'>46 In Stock</td>
                                                        <td><input type="number" name=""/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>M size</td>
                                                        <td className='stock_number'>46 In Stock</td>
                                                        <td><input type="number" name=""/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>L Size</td>
                                                        <td className='stock_number'>46 In Stock</td>
                                                        <td><input type="number" name=""/></td>
                                                    </tr> */}
                                                {/* <tr>
                                                    <td>XL size</td>
                                                    <td className='stock_number'>46 In Stock</td>
                                                    <td><input type="number" name="" /></td>
                                                </tr> */}
                                                {/* {variationData.length > 0 && ( )} */}
                                                {variationData.length > 0 && (
                                                    <tbody>
                                                        {variationData.map((data, index) => (
                                                            <tr key={index}>
                                                                <td>{data.attributes.attribute_pa_size} size</td>
                                                                <td className='stock_number' dangerouslySetInnerHTML={{ __html: data.availability_html} } />
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        name={`quantity-${data.variation_id}`}
                                                                        className='countsize'
                                                                        max={parseInt(data.availability_html)}
                                                                        min={0}
                                                                        value={(selectedItems.find(selectedItem => selectedItem.variation_id === data.variation_id) || {}).quantity || 0}
                                                                        onChange={(e) => handleInputChange(e, data, data.attributes.attribute_pa_size, item)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                )}
                                            </tbody>
                                        </table>
                                        <button className="add-cart-btn">
                                            <a onClick={() => handleSubmit(variationData.length > 0 ? "" : item)} href="#">add to cart</a>
                                        </button>

                                    </div>

                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Table
