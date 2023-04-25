import React, { createContext, useState, useContext, useCallback } from "react";

const LoadingContext = createContext();

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState();

  const LoadingContainer = useCallback(() => {
    if (loading) {
      return (
        <div className="LoadingContainer">
          <img
            src="https://i.stack.imgur.com/kOnzy.gif"
            alt="loading"
            className="LoaderImage"
            onClick={(e) => setLoading(!loading)}
          />
        </div>
      );
    }
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading, LoadingContainer }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
