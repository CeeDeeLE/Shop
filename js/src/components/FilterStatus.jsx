export default function FilterStatus({ countedProducts }) {
  // wenn nix gefunden, dann zusätzliche css-class eintragen in div
  const cssClasses = `filter-status ${countedProducts > 0 ? '' : 'filter-status--no-results'}`;

  // 4. switch - case in eine function ausgelagert und ohne Variable eingesetzt in div;
  return <div className={cssClasses}>{getTextFilterStatus(countedProducts)}</div>;
}

// zu 3. und 4.:
function getTextFilterStatus(countedProducts) {
  switch (countedProducts) {
    case 0:
      return '😥 - kein Produkt gefunden';
    case 1:
      return '1 Produkt gefunden';
    default:
      return `${countedProducts} Produkte gefunden`;
  }
}
