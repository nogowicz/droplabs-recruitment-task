import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IProduct } from '../../types/Product';

import styles from './products.module.scss';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedProducts = [...products];

    if (option === 'title') {
      sortedProducts.sort((a: IProduct, b: IProduct) =>
        a.title.localeCompare(b.title)
      );
    } else if (option === 'price') {
      sortedProducts.sort((a: IProduct, b: IProduct) => a.price - b.price);
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="products">
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div className={styles.products__header}>
            <h1>Products</h1>
            <div className={styles.products__sort}>
              <label htmlFor="sort">Sort by: </label>
              <select id="sort" value={sortOption} onChange={handleSort}>
                <option value="default">Default</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
          <ul className={styles.products__list}>
            {products.map((product: IProduct) => (
              <li key={product.id} className={styles.products__item}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.products__image}
                  />
                  <h2 className={styles.products__title}>{product.title}</h2>
                  <p className={styles.products__price}>
                    ${product.price.toFixed(2)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
