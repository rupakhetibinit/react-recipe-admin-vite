import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ReactQueryDevtools } from 'react-query/devtools';
const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
