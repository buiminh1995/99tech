
import { useState } from "react";

import { mockTokens } from "../data/mockToken";

function SwapCard() {

  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("BTC");
  const [error, setError] = useState("")

  // const handleError = (error) => {
  //   if (Number(amount) <= 0){
  //     setError("Amount must be greater than 0");
  //     return;
  //   }
  //   if (isNaN(Number(amount))){
  //     setError("Amount must be a number");
  //     return;
  //   }
  //   if (fromToken === toToken){
  //     setError("Please select a different currency");
  //     return;
  //   }
  //   setError("");
  // }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const value = e.target.value;
    setAmount(value);
    if (!value.trim()) {
      setError("Amount is required");
    } else if (isNaN(Number(value))) {
      setError("Must be a number");
    } else if (Number(value) <= 0) {
      setError("Amount must be greater than 0");
    } else {
      setError("");
    }
  }

  const handleToToken = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setToToken(value);
    if (fromToken === value){
      setError("Please select a different currency");
      return;
    }
    setError("")
  }

  const handleFromToken = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFromToken(value);
    if (value === toToken){
      setError("Please select a different currency");
      return;
    }
    setError("")
  }

  const calculateReceiveAmount = () => {
    const fromTokenData = mockTokens.find((token) => token.currency === fromToken)
    const toTokenData = mockTokens.find((token) => token.currency === toToken)
    if (!fromTokenData || !toTokenData) {
      return 0;
    }
    return Number(amount) * fromTokenData.price / toTokenData.price;
  }

  return (
    <div>
      <h2>Swap Assets</h2>
      <div>
        <label>From</label>
      </div>
      <select
          value={fromToken}
          onChange={handleFromToken}
        >
          {mockTokens.map((token) => {
            return (
              <option key={token.currency} value={token.currency}>{token.currency}</option>
            )
          })}
      </select>
      <input type="number" value={amount} onChange={handleAmountChange}></input>

      <button>⇅</button>

      <div>
        <label>To:</label>
      </div>
      <select
          value={toToken}
          onChange={handleToToken}
        >
          {mockTokens.map((token) => {
            return (
              <option key={token.currency} value={token.currency}>{token.currency}</option>
            )
          })}
      </select>
      <div>{calculateReceiveAmount()}</div>
      {error && <p>{error}</p>}

      <button>Swap</button>
    </div>
  );
}

export default SwapCard;