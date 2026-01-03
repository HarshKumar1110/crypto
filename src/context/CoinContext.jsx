import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider  = (props) =>{
    
    const [allCoin , setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async() =>{
        
        const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-SD1sdAR4aGFYQi7HaW1t2Kt7'}};

fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&price_change_percentage=1h&order=market_cap_desc`, options)
  .then(res => res.json())
  .then(res => setAllCoin(res))
  .catch(err => console.error(err));
    }

    useEffect(() =>{
        fetchAllCoin();

    },[fetchAllCoin])

    const contextValue = {
        allCoin, currency , setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;