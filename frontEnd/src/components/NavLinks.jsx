import React from 'react';

const NavigationLinks = () => {
  return (
    <nav className="flex flex-row items-center space-x-2">
      <span>About</span>
      <span className="ml-4">Features</span>
      <span className="ml-4">Pricing</span>
      <span className="ml-4">Team</span>
      <span className="ml-4">Blog</span>
    </nav>
  );
};

export default NavigationLinks;
