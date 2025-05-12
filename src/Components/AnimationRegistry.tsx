import React from 'react';
import RevealLinks from '../Animations/RevealLinks';
import Quantumlink from '../Animations/QuantumHover';



export type AnimationRegistryType = Record<string, React.ComponentType<any>>;


const AnimationRegistry: AnimationRegistryType = {
  
  'RevealLinks': RevealLinks,
  "QuantumLink":Quantumlink,
  // Add more animations as needed
};

export default AnimationRegistry; 