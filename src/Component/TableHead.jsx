import React from 'react';

const TableHeader = ({ variationData }) => {
  return (
    <thead>
      <tr>
        {variationData.length > 0 && variationData.map((size, index) => (
          <th key={index}>
            {size?.attributes?.attribute_pa_size?.toUpperCase()}
            {size?.is_pre_order === "yes" && (
              <div style={{
                display: 'inline-block',
                backgroundColor: '#01426a',
                color: 'white',
                fontSize: 'smaller',
                padding: '2px 5px',
                marginLeft: '5px',
                borderRadius: '3px'
              }}>
                Pre-Order
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader