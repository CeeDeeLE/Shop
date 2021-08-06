// für Jonathans Lösung:
// import { categories } from './../products';

export default function FilterForm({
  // für Friedrichs Lösung (übergeben aus Parent Finder.jsx):
  categories,
  // gemeinsame Lösung:
  keyword,
  setKeyword,
  selectedCategory,
  setCategory,
  onSale,
  setSale,
}) {
  // Suchfeld ist leer (kein Startwert)
  // useState in Finder.jsx überführt
  // const [keyword, setKeyword] = useState('');

  return (
    <form className="filter" onSubmit={(e) => e.preventDefault()}>
      <div className="filter__search">
        <div>
          <label htmlFor="keyword">Suchbegriff</label>
          {/* wenn Startwert genutzt werden soll, dann defaultValue statt value ! */}
          <input
            // type="search" -> geht auch, aber: Chrome u.a. setzen ein x ins Suchfeld
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="button" aria-label="Suchbegriff löschen" onClick={() => setKeyword('')}>
            &times;
          </button>
        </div>
      </div>
      <div className="filter__category">
        <label htmlFor="category">Kategorie</label>
        <select
          name="category"
          id="category"
          value={selectedCategory}
          // Friedrichs Lösung - Category liefert Integer:
          // onChange={(e) => setCategory(e.target.value)}
          // Jonathans Lösung:
          onChange={(e) => setCategory(parseInt(e.target.value))}
        >
          <option value="0">alle Kategorien</option>
          {categories.map(({ categoryId, name }) => (
            <option key={categoryId} value={categoryId}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter__sale">
        <label>
          {/* damit die Checkbox nicht am Text klebt, 
          wird nach dem Text ein Leerzeichen per {' '} gesetzt oder &nbsp; */}
          Sonderangebote
          <input type="checkbox" id="sale" checked={onSale} onChange={(e) => setSale(e.target.checked)} />
        </label>
      </div>
    </form>
  );
}
