import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true); 
    const [coins, setCoins] = useState([]);
    const [coin, setCoin] = useState("");
    const [dollar, setDollar] = useState("");
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
            setCoins(json);
            setCoin(json[0]);
            setLoading(false);
        });
    }, [])

    function onChange(event) {
        const selectCoinId = event.target.value;
        const selectCoin = coins.find((coin) => coin.id === selectCoinId);
        setCoin(selectCoin);
      }
    const onChangeInput = (event) => setDollar(event.target.value);
    return (
        <div>
        <h1>The Coins! ({coins.length})</h1>
        {loading ? (<strong>Loading...</strong>) : (
          <div>
            <select onChange={onChange}>
              {coins.map((coin) => {
                return (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                  </option>
                );
              })}
            </select>

            <div>USD to {coin.name}</div>

            <input onChange={onChangeInput} value={dollar} type="number" />
            <span>USD</span>
            <br />
            <input disabled value={dollar / coin.quotes.USD.price} />
            <span>{coin.symbol}</span>
          </div>
        )}
      </div>
    );
};

export default App;