import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterStocks, setFilterStocks] = useState("Tech");

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then((r) => r.json())
      .then((stocks) => setStocks(stocks))
  }, []);

  const sortedStocks = stocks.sort((stockA, stockB) => {
    if(sortBy === "Alphabetically") {
      return stockA.ticker.localeCompare(stockB.ticker)
    } else {
      return stockA.price - stockB.price
      }
    })

  console.log(sortedStocks);

  function handleSorting(newSort) {
      setSortBy(newSort)
    }
  
  const filteredStocks = sortedStocks.filter((stock) => {
      return stock.type === filterStocks })

  console.log(filteredStocks);

  function handleFilterStocks(newFilter) {
    setFilterStocks(newFilter);
  }

  console.log(filterStocks);


  function handleClick(addStock) {
    console.log(addStock);
    setPortfolioStocks([...portfolioStocks, addStock]);
  }
  console.log(portfolioStocks);

  function handleStockDelete(removeStock) {
    const updatedPortfolio = portfolioStocks.filter((stock) => stock.id !== removeStock.id)
    setPortfolioStocks(updatedPortfolio);
  }

  return (
    <div>
      <SearchBar onSorting={handleSorting} onFilterStocks={handleFilterStocks} filterStocks={filterStocks} sortBy={sortBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleClick={handleClick}  />
        </div>
        <div className="col-4">
          <PortfolioContainer onPortfolioStocks={portfolioStocks} handleStockDelete={handleStockDelete} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
