import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  setIsProjectLoading: (loading: boolean) => void;
  isProjectLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isProjectLoading, setIsProjectLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isProjectLoading, setIsProjectLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
