import React from 'react'
import { getStatusClass, getStatusText } from '../Common/function'

const VariationList = ({ product }) => {
    return (
        <div className="product_item_detail">
            <div className="product_item_left">

                <div className="product_order">
                    {product?.variations_data?.length > 0 && product?.variations_data.map((variation) => (
                        <div className={`product_order_item ${getStatusClass(variation.stock_status)}`} key={variation.id}>
                            <p>{getStatusText(variation.stock_status, variation.stock_quantity)}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default VariationList