import { Link } from 'react-router-dom';

import { useLastVisitedProduct } from '../../hooks/useLastVisitedProduct';

export default function Home() {
  const { lastVisitedProductId } = useLastVisitedProduct();

  return (
    <div>
      <h1>Welcome to our Store!</h1>
      {lastVisitedProductId && (
        <p>
          <Link to={`/products/${lastVisitedProductId}`}>
            Return to product browsing
          </Link>
        </p>
      )}
    </div>
  );
}
