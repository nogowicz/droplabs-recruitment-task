import React, { createContext, useEffect, useState } from 'react';

const LastVisitedProductContext = createContext<
  | {
      lastVisitedProductId: number | null;
      updateLastVisitedProductId: (id: number) => void;
    }
  | undefined
>(undefined);

export function LastVisitedProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lastVisitedProductId, setLastVisitedProductId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const storedProductId = localStorage.getItem('lastVisitedProductId');
    if (storedProductId) {
      setLastVisitedProductId(Number(storedProductId));
    }
  }, []);

  const updateLastVisitedProductId = (id: number) => {
    localStorage.setItem('lastVisitedProductId', id.toString());
    setLastVisitedProductId(id);
  };

  return (
    <LastVisitedProductContext.Provider
      value={{
        lastVisitedProductId,
        updateLastVisitedProductId,
      }}
    >
      {children}
    </LastVisitedProductContext.Provider>
  );
}

export { LastVisitedProductContext };
