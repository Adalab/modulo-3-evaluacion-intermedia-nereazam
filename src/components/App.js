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
      <header>
        <h1>Frases de Friends</h1>
      </header>
      <main>
        <form action="">
          filtrar por frase
          <input type="text" onChange={handleFilter} value={searchFilter} />
          filtrar por personaje
          <select onChange={handleSelect} value={searchSelect}>
            <option value="all">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
        </form>
        <ul>{filteredData}</ul>
        <form action="">
          <h2> Añadir nueva frase</h2>
          Frase
          <input
            type="text"
            id="quote"
            onChange={handleNewQuote}
            value={newQuote.quote}
          />
          Personaje
          <input
            type="text"
            id="character"
            onChange={handleNewQuote}
            value={newQuote.character}
          />
          <button onClick={handleAddButton}>Añadir una nueva frase</button>
        </form>
      </main>
    </div>
  );
}

export default App;
