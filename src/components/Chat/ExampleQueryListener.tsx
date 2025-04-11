
import { useEffect } from 'react';

interface ExampleQueryListenerProps {
  onQuerySelected: (query: string) => void;
}

const ExampleQueryListener: React.FC<ExampleQueryListenerProps> = ({ onQuerySelected }) => {
  useEffect(() => {
    const handleExampleQuery = (event: CustomEvent) => {
      onQuerySelected(event.detail);
    };

    // Add event listener
    window.addEventListener('example-query', handleExampleQuery as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('example-query', handleExampleQuery as EventListener);
    };
  }, [onQuerySelected]);

  return null; // This is a behavior component, not rendering anything
};

export default ExampleQueryListener;
