import React from 'react';

const TableHeader = ({ variationData }) => {
  return (
    <thead>
      <tr>
        {variationData.length > 0 && variationData.map((size, index) => (
          <th key={index}>
            {size?.attributes?.attribute_pa_size?.toUpperCase()}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader