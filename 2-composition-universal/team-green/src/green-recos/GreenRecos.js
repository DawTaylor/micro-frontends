import React from 'react';

export const GreenRecos = ({ reco }) => {
  return (
    <div>
      <h3>Related Products</h3>
      {
        reco.map(id => <img src={`./green/images/reco_${id}.jpg`} alt={`Reco ${id}`}  key={id} />)
      }
    </div>
  )
}