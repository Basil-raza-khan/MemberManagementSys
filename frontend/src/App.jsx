import React from "react";
import Banner from "./components/Banner";
import MembersManager from "./components/MembersManager";
import StarsBackground from "./components/StarsBackground"; 

function App() {
  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-950 p-8">
     
      <StarsBackground />

      <div className="relative z-10">
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
    </div>
  );
}

export default App;
