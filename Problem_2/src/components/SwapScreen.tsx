import Header from './Header'
import SwapCard from './SwapCard';
import LoadingScreen from './LoadingScreen'
import { useState } from "react";

function SwapScreen() {
    const [status, setStatus] = useState<"swap" | "loading" | "success">("swap")

    const handleSwap = async () => {
        setStatus("loading");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        setStatus("success")
    }
    return(
        <>
        <Header/>
        {status === "swap" && <SwapCard onSwap={handleSwap}/>} 
        {status === "loading" && <LoadingScreen />}
        </>
    )
}

export default SwapScreen;