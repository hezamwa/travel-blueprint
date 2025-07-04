import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  shadow = 'shadow-lg',
  ...props
}) => {
  const baseClasses = `bg-white rounded-2xl ${shadow} ${padding}`;
  const hoverClasses = hover ? 'hover:shadow-xl transition-all duration-300 travel-card' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card; 