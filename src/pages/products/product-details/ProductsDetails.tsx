import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './product-details.module.scss';
import { IProduct } from '../Products';
import { useLastVisitedProduct } from '../../../hooks/useLastVisitedProduct';

function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { updateLastVisitedProductId } = useLastVisitedProduct();

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

export default ProductsDetails;
