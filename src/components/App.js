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
    setSearchFilter(ev.currentTarget.value);
  };

  const handleSelect = (ev) => {
    setSearchSelect(ev.currentTarget.value);
  };

  const handleAddButton = (ev) => {
    ev.preventDefault();
    setData([...data, newQuote]);
  };
  //////////////////////////////
  const handleNewQuote = (ev) => {
    const inputId = ev.target.id;
    const inputValue = ev.target.value;
    setNewQuote({ ...newQuote, [inputId]: inputValue });
  };

  /////////////////////////////////
  return (
    <div className="App">
      <div class="container">
        <header>
          <h1>
            Frases de <span>Friends</span>
          </h1>
        </header>
        <main>
          <form action="" class="search-form">
            <div class="search-filters">
              <label for="quote-filter">Filtrar por frase</label>
              <input
                type="text"
                id="quote-filter"
                onChange={handleFilter}
                value={searchFilter}
              />

              <label for="character-filter">Filtrar por personaje</label>
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
          </form>{" "}
          <form action="" class="new-quote-form">
            <h2>Añadir nueva frase</h2>
            <div class="form-group">
              <label for="new-quote">Frase</label>
              <input
                type="text"
                id="new-quote"
                onChange={handleNewQuote}
                value={newQuote.quote}
              />
            </div>
            <div class="form-group">
              <label for="new-character">Personaje</label>
              <input
                type="text"
                id="new-character"
                onChange={handleNewQuote}
                value={newQuote.character}
              />
            </div>
            <button class="add-button" onClick={handleAddButton}>
              Añadir una nueva frase
            </button>
          </form>
          <ul class="quote-list">{filteredData}</ul>
        </main>
      </div>
    </div>
  );
}

export default App;
