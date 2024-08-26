import { useContext } from 'react';

import { LastVisitedProductContext } from '../contexts/LastVisitedProductContext';

export function useLastVisitedProduct() {
  const context = useContext(LastVisitedProductContext);
  if (!context) {
    throw new Error(
      'useLastVisitedProduct must be used within a LastVisitedProductProvider'
    );
  }
  return context;
}
