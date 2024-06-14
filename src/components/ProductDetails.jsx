import React from 'react';

const ProductDetails = ({ name, status, species, type, gender, image }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Species:</strong> {species}</p>
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Gender:</strong> {gender}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
