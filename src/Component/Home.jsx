import React from 'react';

const HomePage = () => {
  return (
    <div className="h-screen bg-cover bg-center" style={{backgroundImage: 'url("https://www.imagesofempowerment.org/wp-content/uploads/Blanket_Release_AMREF_MAGADI_MASAI_FORUM_SHOMPOLE_0120-1200x800.jpg")'}}>
      <div className="flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the Masai Forum</h1>
        <p className="text-lg mb-8 text-center">You can login or register to see the posts and raise queries.</p>
       
      </div>
    </div>
  );
};

export default HomePage;
