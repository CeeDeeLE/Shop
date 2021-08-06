// b. für eigenen Hook
import { useProductsContext } from './Shop';

import Product from './Product';

// a. und b. Funktion mit Args für react-Hook und eigenen Hook mit Context
export default function ProductsList() {
  // b. für eigenen Hook und Context
  const products = useProductsContext();

  return (
    <>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </>
  );
}
