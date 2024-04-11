import React from 'react'

const Loader = ({loading}) => {
  return (
    loading && (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader-text">Loading...</div>
            </div>
        </div>
    )  )
}

export default Loader