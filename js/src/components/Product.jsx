// b. für eigenen Hook und Context
import { useBasketDispatchContext } from './Shop';

import { getFormattedPrice } from '../helpers';

// a. und b. Funktion mit Args für react-Hook und eigenen Hook mit Context
export default function Product({ id, title, image, price, measure, sale }) {
  // b. für eigenen Hook
  // gib den Context in useContext und erhalte den Wert zurück, der als value im Context-Provider steht.
  const basketDispatch = useBasketDispatchContext();

  const cssClasses = `product ${sale ? 'product--sale' : ''}`;

  return (
    <article className={cssClasses}>
      <div className="product__image" alt={title} title={title}>
        {image}
      </div>
      <h3 className="product__heading">{title}</h3>
      <p className="product__price">{getFormattedPrice(price)}</p>
      <p className="product__measure">{measure}</p>
      <button
        // was basketDispatch() mitgegeben wird
        // landet in der function useReducer (s. shop.js)
        onClick={() => basketDispatch({ type: 'add', id })}
        aria-label={`${title} in den Warenkorb`}
      >
        Kaufen
      </button>
    </article>
  );
}
