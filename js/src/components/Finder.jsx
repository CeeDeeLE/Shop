import { useEffect, useState } from 'react';

// beide Export-Fkt. importieren für Friedrichs Lösung
// import von categories und Übergabe an FilterForm:
import products, { categories } from './../products';
import FilterForm from './FilterForm';
import FilterStatus from './FilterStatus';
import ProductsList from './ProductsList';
// import BasketDisplay from './BasketDisplay';

/**
 * Export-Funktion -> integriert in app.jss -> Ausgabe in Browser
 * @returns
 */
export default function Finder() {
  // filtern nach Suchwort oder Kategorie, bevor Ergebnis übergeben wird
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setCategory] = useState(0);
  const [onSale, setSale] = useState(false);

  const [loading, setLoading] = useState(true);

  /* 
  document.title = keyword;
  mit useEffect: als title keyword oder 
  "React Filter", wenn keyword leer ist 
  */
  useEffect(() => {
    let title = 'React Filter';
    if (keyword) {
      title = keyword;
    }

    if (onSale) {
      title += ' - Sonderangebote';
    }
    document.title = title;
  }, [keyword, onSale]);

  // muss als erstes ausgeführt werden -> vor dem Überschreiben
  useEffect(() => {
    const url = new URL(window.location.href);

    const oldKeyword = url.searchParams.get('keyword');
    const oldCategory = url.searchParams.get('category');
    const oldSale = url.searchParams.get('sale');

    if (oldKeyword) {
      setKeyword(oldKeyword);
    }
    if (oldCategory) {
      setCategory(parseInt(oldCategory));
    }
    if (oldSale) {
      setSale(true);
    }

    // "Ladevorgang" ist beendet
    setLoading(false);
  }, []);

  useEffect(() => {
    // 1. Konstruiere eine url auf Basis der aktuellen URL (window.location).
    const url = new URL(window.location.href);

    // 2. für Suchwort
    // 2a. Lösche einen evtl vorhanden Anhang ähnlich ?id=...
    url.searchParams.delete('keyword');
    // 2b. Setze einen (neuen) Anhang ähnlich ?id=...
    if (keyword) {
      url.searchParams.set('keyword', keyword);
    }
    // 2. für Kategorie
    url.searchParams.delete('category');
    if (selectedCategory) {
      url.searchParams.set('category', selectedCategory);
    }
    // 2. für Sale
    url.searchParams.delete('sale');
    if (onSale) {
      url.searchParams.set('sale', onSale);
    }

    // 3. Ändere den aktuellen URL-Eintrag im Adressfeld (window.history).
    window.history.replaceState({}, '', url);
  }, [keyword, selectedCategory, onSale]);

  const filteredProducts = getFilteredProducts(products, keyword, selectedCategory, onSale);
  const productsCounted = filteredProducts.length;

  // Stelle beim ersten Laden nichts dar, um Flackern zu vwerhindern
  if (loading) {
    return null;
  }

  return (
    <div className="filterandproducts">
      <div className="filter">
        {/* Übergeben von Variablen und Funktionen an Parent -> s.a. Gallery */}
        <FilterForm
          // für Friedrichs Lösung:
          categories={categories}
          // gemeinsame Lösung:
          keyword={keyword}
          setKeyword={setKeyword}
          selectedCategory={selectedCategory}
          setCategory={setCategory}
          onSale={onSale}
          setSale={setSale}
        />
      </div>
      {/* Die Component FilterStatus soll zwischen Filterleiste 
      und Produktliste erscheinen.
      */}
      <div className="filter">
        <FilterStatus countedProducts={productsCounted} />
      </div>
      <div className="products">
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
}

// Infos müssen auch dieser function mitgegeben werden
function getFilteredProducts(products, keyword, selectedCategory, selectedSale) {
  /* 
  Regulärer Ausdruck, um zu testen, ob ein Muster in einem
  anderen String vorkommt. "i" bedeutet "case insensitive",
  also Großschreibung ignorieren.
  */
  const keywordRegExp = new RegExp(keyword, 'i');

  // erst ab 2. eingegebenem Zeichen Ergebnis der Suche ausgeben
  const noKeywordFilter = keyword.length < 2;

  const noCategoryFilter = selectedCategory === 0;

  const noSaleFilter = selectedSale === false;
  // const noSaleFilter = !selectedSale;

  const filteredProducts = products
    .filter(
      ({ title }) =>
        // 1. Möglichkeit des Suchwortabgleichs
        // title.toUpperCase().includes(keyword.toUpperCase())
        // 2. Möglichkeit des Suchwortabgleichs
        noKeywordFilter || keywordRegExp.test(title)
    )
    // 2. Filterfunktion anhängen, die nach selbem Muster z.B. nach Kategorie filtert
    //.filter(({ category }) => noCategoryFilter || selCatInt === category)
    .filter(({ category }) => noCategoryFilter || selectedCategory === category)
    .filter(({ sale }) => noSaleFilter || sale);

  return filteredProducts;
}
