
"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input"


import { useState } from "react";

import { mockTokens } from "../data/mockToken";

type SwapScreenProps = {
  onSwap: () => void;
}

function SwapCard({onSwap}: SwapScreenProps) {

  const [amount, setAmount] = useState("0");
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("BLUR");
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

  const handleToToken = (value : string | null) => {
    if (value) {
      setToToken(value);
      if (fromToken === value){
        setError("Please select a different currency");
        return;
      }
      setError("")
    }
  }

  const handleFromToken = (value: string | null) => {
    // const value = e.target.value;
    if (value){
      setFromToken(value);
      if (value === toToken){
        setError("Please select a different currency");
        return;
      }
      setError("")
    }
  }

  const calculateReceiveAmount = () => {
    const fromTokenData = mockTokens.find((token) => token.currency === fromToken)
    const toTokenData = mockTokens.find((token) => token.currency === toToken)
    if (!fromTokenData || !toTokenData) {
      return 0;
    }
    return (Number(amount) * fromTokenData.price / toTokenData.price).toFixed(2);
  }

  const handleSwitchToken = () => {
    const fromTokenSaved = fromToken;
    setFromToken(toToken);
    setToToken(fromTokenSaved);
    setAmount("0");
    setError("");
  }

  return (
    <div className="swap-card-container">
      <div className="swap-card">
        <div className="swap-title font-mono">Swap</div>
        <div className="swap-button-contaniner">
          <button onClick={handleSwitchToken} className="swap-button">⇅</button>
        </div>
        <div className="flex flex-col gap-1">
        <div className="swap-card-from-token">
          <div className="first">
            <div className="token-logo-container">
              <img className="token-logo" src={`/${fromToken}.svg`} />
            </div>
            <div className="select-and-text">
                <Select onValueChange={handleFromToken} value={fromToken}>
                  <SelectTrigger className="text-white border-0 px-0">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {mockTokens.map((token) => (
                      <SelectItem
                        key={token.currency}
                        value={token.currency}
                      >
                        {token.currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <select
                    value={fromToken}
                    onChange={handleFromToken}
                    className="token-selector"
                  >
                    {mockTokens.map((token) => {
                      return (
                        <option key={token.currency} value={token.currency}>{token.currency}</option>
                      )
                    })}
                </select> */}
              <div className="flex">Balance:&nbsp;<div className="text-white"> 22.60 ETH</div></div>
            </div>
          </div>
          <div className="second flex justify-center items-center">
            {/* <input type="number" value={amount} onChange={handleAmountChange}></input> */}
            <Input 
                className="w-40 font-bold text-white tabular-nums !text-2xl font-mono text-right border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text" 
                value={amount}
                onChange={handleAmountChange}
              />
          </div>
        </div>
        <div className="swap-card-from-token">
          <div className="first">
            <div className="token-logo-container">
              <img className="token-logo" src={`/${toToken}.svg`} />
            </div>
            <div className="select-and-text">
              <Select onValueChange={handleToToken} value={toToken}>
                  <SelectTrigger className="text-white border-0 px-0">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {mockTokens.map((token) => (
                      <SelectItem
                        key={token.currency}
                        value={token.currency}
                      >
                        {token.currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex">Balance:&nbsp;<div className="text-white"> 22.60 ETH</div></div>
              {/* <div className="token-selector-wrapper"> */}
                {/* <select
                    value={toToken}
                    onChange={handleToToken}
                    className="token-selector"
                  >
                    {mockTokens.map((token) => {
                      return (
                        <option key={token.currency} value={token.currency}>{token.currency}</option>
                      )
                    })}
                </select> */}
                {/* <div className="token-selector-arrow">▼</div> */}
              {/* </div> */}
            </div>
          </div>
          <div className="second flex items-center">
            <div className="truncate text-right w-40 font-bold text-white tabular-nums !text-2xl font-mono">{calculateReceiveAmount()}</div>
          </div>
        </div>
        </div>
          <p className="h-1 text-sm text-red-500 mt-1 text-center">{error}</p>

        <button className="
          font-mono
          mt-4
          w-full
          h-14
          rounded-2xl
          bg-violet-600
          hover:bg-violet-500
          text-white
          text-lg
          font-semibold
          transition-all
          duration-200
          hover:scale-[1.02]
          shadow-lg
          shadow-violet-900/30
        "
          onClick ={onSwap}
          disabled={error !== "" || amount === "0"}
        >
          Swap
        </button>
      </div>
    </div>
  );
}

export default SwapCard;
