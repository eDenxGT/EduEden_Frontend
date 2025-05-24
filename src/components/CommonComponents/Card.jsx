/* eslint-disable react/prop-types */
const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`rounded-md shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;