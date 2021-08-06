import { useReducer, useEffect, createContext, useContext } from 'react';

import Finder from './Finder';
// import ProductsList from './ProductsList';
import BasketDisplay from './BasketDisplay';
import products from '../products';

// erschaffen eines Contextes außerhalb der Component
// createContext() benötigt an dieser Stelle keinen Startwert (meist gar nicht sinnvoll)
export const BasketDispatchContext = createContext(null);
// b. eigener Hook, der das Ex- und Importieren des Contextes erspart
export function useBasketDispatchContext() {
  const basketDispatch = useContext(BasketDispatchContext);
  return basketDispatch;
}

// erschaffen eines Contextes außerhalb der Component
const ProductsContext = createContext(null);
// b. für Nutzung des eigenen Hook in Kind- und Kindeskind-Components
export function useProductsContext() {
  const products = useContext(ProductsContext);
  return products;
}

// a. und b.
export default function Shop() {
  const [basket, basketDispatch] = useReducer(basketReducer, null, getInitialBasketState);

  useEffect(() => localStorage.setItem('basket', JSON.stringify(basket)), [basket]);

  return (
    <>
      <BasketDispatchContext.Provider value={basketDispatch}>
        <ProductsContext.Provider value={products}>
          <div className="shopandbasket">
            <Finder basketDispatch={basketDispatch} />
            <BasketDisplay basket={basket} />
          </div>
        </ProductsContext.Provider>
      </BasketDispatchContext.Provider>{' '}
    </>
  );
}

// Startwert für den Warenkorb setzen
function getInitialBasketState() {
  const oldBasket = JSON.parse(localStorage.getItem('basket'));
  if (Array.isArray(oldBasket)) {
    return oldBasket;
  }
  return [];
}

// function erhält als erstes den aktuellen Zustand (basket)
// und als zweites die Botschaft aus product.js onClick-Pfeilfunktion
function basketReducer(basket, message) {
  // zerlegt: function basketReducer(basket, {id, type}) {

  // Array-Methoden, die Boolean zurückgeben für Prüfung: some, all, evtl. find mit Umwandlung zu true / false
  const productNotInBasket = !basket.some(({ id }) => id === message.id);

  switch (message.type) {
    /*
    basket enthält den aktuelen state. Dieser sollte nie manipuliert werden, z.B. mit basket.push(). Stattedessen sollte man eine geänderte Kopie des states zurückgeben (immutability, also Mutationen von Daten vermeiden).
    hier Kopie: ...basket
    */
    case 'add':
      if (productNotInBasket) {
        return [...basket, { id: message.id, amount: 1 }];
      }
      // da in if return-Wert, braucht es kein else
      // wird nur ausgeführt, wenn bereits in Basket -> dann + 1
      return basket.map((product) => {
        if (product.id === message.id) {
          // Lösung Annika - manipuliert bestehenden basket:
          // product.amount++;

          // Lösung Jonathan - mit immutability:
          // amount wird als Argument mitgegeben und mit amount + 1 überschrieben
          return { ...product, amount: product.amount + 1 };
        }
        return product;
      });

    case 'subtract':
      // wird nur ausgeführt, wenn bereits 1x in Basket -> dann - 1
      return (
        basket
          .map((product) => {
            // // meine Lösung:
            // if (product.id === message.id && product.amount > 0) {
            //   return { ...product, amount: product.amount - 1 };
            // }

            // Jonathans Lösung:
            if (product.id === message.id) {
              // Lösung Jonathan - mit immutability:
              // amount wird als Argument mitgegeben und mit amount - 1 überschrieben
              return { ...product, amount: product.amount > 0 ? product.amount - 1 : 0 };
            }
            return product;
          })
          // Bonus: Produkt verschwindet bei 0 aus dem Warenkorb
          .filter(({ amount }) => amount > 0)
      );

    case 'remove':
      // // meine Lösung:
      // return basket.filter((product) => product.id !== message.id);

      // Jonathans Lösung:
      return basket.filter(({ id }) => id !== message.id);

    case 'removeAll':
      return [];

    default:
      return basket;
  }
}
