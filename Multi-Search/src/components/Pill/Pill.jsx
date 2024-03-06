import React from 'react';
import './Pill.scss'

const Pill = ({image,fullName,onPillClick}) => {
  return (
    <div className='pill' onClick={onPillClick}>
        <img src={image} alt="Image" />
        <span>{fullName} &times;</span>
    </div>
  )
}

export default Pill;