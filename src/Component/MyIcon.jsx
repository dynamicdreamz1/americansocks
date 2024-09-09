const MyComponent = ({ color}) => {
    return (
      <div>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          style={{ width: '20px', height: '20px' }} // You can adjust the size here
        >
          <polygon
            style={{ fill: "#FFFFFF" }}
            points="0,477.703 256,477.703 289.391,256 256,34.297"
          />
          <polygon
            style={{ fill: "#FFFFFF" }}
            points="256,34.297 256,477.703 512,477.703"
          />
          <g>
            <circle style={{ fill: color }} cx="256" cy="405.359" r="16.696" />
            <rect
              x="239.304"
              y="177.185"
              style={{ fill: color }}
              width="33.391"
              height="178.087"
            />
          </g>
        </svg>
      </div>
    );
  };
  
  export default MyComponent;
  