import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ onPortfolioStocks, handleStockDelete }) {

  return (
    <div>
      <h2>My Portfolio</h2>
      {onPortfolioStocks.map((info) => {
        return (
          <div>
          <div className="card" onClick={() => handleStockDelete(info)} >
            <div className="card-body">
              <h5 className="card-title">{info.name}</h5>
              <p className="card-text">{info.ticker}: {info.price}</p>
            </div>
          </div>
        </div>
      )
      })}
    </div>
  );
}

export default PortfolioContainer;
