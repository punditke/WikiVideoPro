import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [theme, setTheme] = useState('dark');

  const addRecentSearch = (search) => {
    setRecentSearches(prev => [search, ...prev.filter(s => s !== search)].slice(0, 5));
  };

  return (
    <AppContext.Provider value={{
      recentSearches,
      addRecentSearch,
      selectedVideo,
      setSelectedVideo,
      theme,
      setTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
