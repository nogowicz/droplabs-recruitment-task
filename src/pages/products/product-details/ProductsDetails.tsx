import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useLastVisitedProduct } from '../../../hooks/useLastVisitedProduct';

import { IProduct } from '../../../types/Product';

import styles from './product-details.module.scss';

export default function ProductsDetails() {
  const { id } = useParams();
  const { updateLastVisitedProductId } = useLastVisitedProduct();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });

    updateLastVisitedProductId(Number(id));
  }, [id, updateLastVisitedProductId]);

  return (
    <div className={styles['product-details']}>
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        product && (
          <>
            <h1 className={styles['product-details__title']}>
              {product.title}
            </h1>
            <img
              src={product.image}
              alt={product.title}
              className={styles['product-details__image']}
            />
            <p className={styles['product-details__price']}>
              Price: ${product.price.toFixed(2)}
            </p>
            <p className={styles['product-details__category']}>
              Category: {product.category}
            </p>
            <p className={styles['product-details__rating']}>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <p className={styles['product-details__description']}>
              {product.description}
            </p>
          </>
        )
      )}
    </div>
  );
}
