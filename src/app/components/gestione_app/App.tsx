import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';

function App(): JSX.Element {
  return (
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}

export default App;
