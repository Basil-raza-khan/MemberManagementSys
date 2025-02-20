
import React from 'react';

const Banner = ({ title, description, buttonText, onButtonClick }) => {
  return (
    <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
      <button
        onClick={onButtonClick}
        className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Banner;