import React from 'react';

const Layout = ({title, children}) => {
  return (
    <div className="chart-container">
        <h3 className="chart-title">
          {title}
        </h3>
        {children}
      </div>
  )
}

export default Layout;