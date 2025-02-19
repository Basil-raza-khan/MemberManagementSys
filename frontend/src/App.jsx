// App.jsx
import React from 'react';
import Banner from './components/Banner';
import MembersManager from './components/MembersManager';

function App() {
  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <Banner
        title="Welcome to Our Website"
        description="Discover amazing features and services tailored just for you."
        buttonText="Get Started"
        onButtonClick={handleButtonClick}
      />
      <div className="mt-8 w-full">
        <MembersManager />
      </div>
    </div>
  );
}

export default App;