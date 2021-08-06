// b. für eigenen Hook und Context
import { useBasketDispatchContext, useProductsContext } from './Shop';

import { getFormattedPrice } from '../helpers';

// a. und b. Funktion mit Args für react-Hook und eigenen Hook mit Context
export default function BasketItem({ id, amount }) {
  // b. eigner Hook und Context
  const basketDispatch = useBasketDispatchContext();
  const products = useProductsContext();

  const product = getProductWithId(id, products);

  if (!product) {
    return null;
  }

  const { title, price } = product;

  return (
    <li className="basket-item">
      <span className="basket-item__amount">{amount} &times; </span>
      <span className="basket-item__title">{title}: </span>
      <span className="basket-item__price">{getFormattedPrice(price * amount)}</span>
      <div className="basket-item__buttons">
        <button
          onClick={() => basketDispatch({ type: 'subtract', id })}
          disabled={Boolean(amount <= 0)}
          className="basket-item__button"
          aria-label={`${title} minus eins`}
          title={`${title} minus eins`}
        >
          -
        </button>
        <button
          onClick={() => basketDispatch({ type: 'add', id })}
          className="basket-item__button"
          aria-label={`${title} plus eins`}
          title={`${title} plus eins`}
        >
          +
        </button>
        <button
          onClick={() => basketDispatch({ type: 'remove', id })}
          className="basket-item__button"
          aria-label={`${title} aus Warenkorb löschen`}
          title={`${title} aus Warenkorb löschen`}
        >
          &times;
        </button>
      </div>
    </li>
  );
}

function getProductWithId(searchedId, products) {
  return products.find(({ id }) => id === searchedId);
}
