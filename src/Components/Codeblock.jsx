import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Create a custom vibrant theme based on vscDarkPlus
const brightTheme = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    color: '#ffffff', // Bright white for default text
  },
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#0d0d2b', // Deep blue background for better contrast
  },
  // Vibrant colors for syntax elements
  'keyword': { color: '#ff3377' },            // Bright magenta for keywords
  'function': { color: '#00ffbb' },           // Bright teal for functions
  'string': { color: '#ffff00' },             // Bright yellow for strings
  'number': { color: '#ff9d00' },             // Bright orange for numbers
  'boolean': { color: '#ff3377' },            // Bright pink for booleans
  'comment': { color: '#72fb72' },            // Bright green for comments
  'class-name': { color: '#00ddff' },         // Bright cyan for class names
  'operator': { color: '#ff5252' },           // Bright red for operators
  'punctuation': { color: '#eeeeee' },        // Bright light gray for punctuation
  'property': { color: '#bbaaff' },           // Bright lavender for properties
  'tag': { color: '#ff6600' },                // Bright orange-red for tags
  'attr-name': { color: '#5bfff7' },          // Bright aqua for attribute names
  'attr-value': { color: '#ff8cf1' },         // Bright pink for attribute values
  'variable': { color: '#8bff87' },           // Bright mint green for variables
};

export const CodeBlock = ({ code, language = 'javascript' }) => (
  <div className="code-block-container">
    <SyntaxHighlighter 
      language={language} 
      style={brightTheme} 
      className="rounded-lg"
      wrapLines={true}
      showLineNumbers={true}
    >
      {code || '// No code provided'}
    </SyntaxHighlighter>
  </div>
);