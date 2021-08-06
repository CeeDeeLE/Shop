// b. für eigenen Hook und Context
import { useBasketDispatchContext } from './Shop';

import BasketItem from './BasketItem';

// a. und b. Funktion mit Args für react-Hook und eigenen Hook
export default function BasketDisplay({ basket }) {
  const basketDispatch = useBasketDispatchContext();
  const basketIsEmpty = basket.length === 0;

  return (
    <section className="basket">
      <h2 className="basket__heading">Warenkorb</h2>
      {basketIsEmpty && <span className="basket__text">Der Warenkorb ist leer</span>}
      {basketIsEmpty || (
        <>
          <ul className="basket__list">
            {basket.map((item) => (
              <BasketItem key={item.id} {...item} />
            ))}
          </ul>
          <button
            onClick={() => basketDispatch({ type: 'removeAll' })}
            className="basket-item__button"
            aria-label="Warenkorb leeren"
            title="Warenkorb leeren"
          >
            Warenkorb leeren
          </button>
        </>
      )}
    </section>
  );
}
