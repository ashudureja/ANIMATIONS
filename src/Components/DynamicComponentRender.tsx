import React from 'react';
import AnimationRegistry from './AnimationRegistry';

interface DynamicComponentRendererProps {
  componentKey: string;
  props?: Record<string, any>;
}

/**
 * Renders a component dynamically based on a key from Sanity
 * @param componentKey - The key of the component in the registry
 * @param props - Optional props to pass to the component
 */
const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({ 
  componentKey, 
  props = {} 
}) => {
  // Get the component from the registry
  const Component = AnimationRegistry[componentKey];

  // If component doesn't exist, render a fallback
  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-accent  rounded-xl text-center">
        <p className="text-muted-foreground">
          Animation component "{componentKey}" not found in registry.
        </p>
      </div>
    );
  }

  // Render the component with props
  return <Component {...props} />;
};

export default DynamicComponentRenderer; 