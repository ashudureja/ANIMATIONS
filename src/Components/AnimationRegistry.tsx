import React from 'react';
import RevealLinks from '../Animations/RevealLinks';
import Quantumlink from '../Animations/QuantumHover';

import MenuNeon from '../Animations/MenuRevealNeon';



export type AnimationRegistryType = Record<string, React.ComponentType<any>>;


const AnimationRegistry: AnimationRegistryType = {
  
  'RevealLinks': RevealLinks,
  "QuantumLink":Quantumlink,
  "MenuLinksReveal":MenuNeon,
  // Add more animations as needed
};

export default AnimationRegistry; 