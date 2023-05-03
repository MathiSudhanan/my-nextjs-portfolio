import React from 'react'

interface leftArrowProps{
  onClickHandler: () => void;
}

const LeftArrow = ({ onClickHandler }: leftArrowProps) => {

  return (
    <svg onClick={onClickHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
};

export default LeftArrow