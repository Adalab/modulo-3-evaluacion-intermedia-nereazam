import "../styles/App.scss";
import { useState, useEffect } from "react";
import callToApi from "../services/api";

function App() {
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchSelect, setSearchSelect] = useState("all");
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });
  const [newQuoteList, setNewQuoteList] = useState([]);

  useEffect(() => {
    callToApi().then((response) => {
      setData(response);
    });
  }, []);

  const filteredData = data
    .filter((dataItem) => {
      return dataItem.quote.toLowerCase().includes(searchFilter.toLowerCase());
    })
    .filter((item) => {
      if (searchSelect === "all") {
        return true;
      }
      return item.character === searchSelect;
    })
    .map((dataItem, id) => {
      return (
        <li key={id}>
          <h3>{dataItem.quote}</h3>
          <span>{dataItem.character}</span>
        </li>
      );
    });

  const handleFilter = (ev) => {
    setSearchFilter(ev.target.value);
  };

  const handleSelect = (ev) => {
    setSearchSelect(ev.target.value);
  };

  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleClickAdd = (ev) => {
    ev.preventDefault();
    setNewQuote({ quote: "", character: "" });
    setNewQuoteList([...newQuoteList, newQuote]);
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>
            Frases de <span>Friends</span>
          </h1>
        </header>
        <main>
          <form action="" className="search-form">
            <div className="search-filters">
              <label htmlFor="quote-filter">Filtrar por frase</label>
              <input
                type="text"
                id="quote-filter"
                onChange={handleFilter}
                value={searchFilter}
              />

              <label htmlFor="character-filter">Filtrar por personaje</label>
              <select
                id="character-filter"
                onChange={handleSelect}
                value={searchSelect}
              >
                <option value="all">Todos</option>
                <option value="Ross">Ross</option>
                <option value="Monica">Monica</option>
                <option value="Joey">Joey</option>
                <option value="Phoebe">Phoebe</option>
                <option value="Chandler">Chandler</option>
                <option value="Rachel">Rachel</option>
              </select>
            </div>
          </form>
          <form className="new-quote-form">
            <h2>Añadir nueva frase</h2>
            <div className="form-group">
              <label htmlFor="new-quote">Frase</label>
              <input
                type="text"
                id="new-quote"
                name="quote"
                onChange={handleNewQuote}
                value={newQuote.quote}
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-character">Personaje</label>
              <input
                type="text"
                name="character"
                id="new-character"
                onChange={handleNewQuote}
              />
            </div>
            <button className="add-button" onClick={handleClickAdd}>
              Añadir una nueva frase
            </button>
          </form>
          <ul className="quote-list">
            {newQuoteList.map((item, id) => (
              <li key={id}>
                <h3>{item.quote}</h3>
                <span>{item.character}</span>
              </li>
            ))}
          </ul>
          <ul className="quote-list">{filteredData}</ul>
        </main>
      </div>
    </div>
  );
}

export default App;
