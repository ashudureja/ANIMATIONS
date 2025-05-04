import React from 'react';
import RevealLinks from '../Animations/RevealLinks';


export type AnimationRegistryType = Record<string, React.ComponentType<any>>;


const AnimationRegistry: AnimationRegistryType = {
  
  'RevealLinks': RevealLinks,
  // Add more animations as needed
};

export default AnimationRegistry; 