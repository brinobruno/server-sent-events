import { useEffect, useState } from "react"
import { formatToCurrency } from "./formatToCurrency"

const API_URL = 'http://localhost:3000'

export function StockApp() {
  const [stockData, setStockData] = useState({
    stock1Rate: null,
    stock2Rate: null,
  })

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(`${API_URL}/rates`)
    
    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const stockData = JSON.parse(event.data)
      setStockData({ ...stockData })
    }
    
    // terminating the connection on component unmount
    return () => eventSource.close()
  }, [])

  return (
    <div>
      <h1>Stock prices:</h1>
      <div>
        {stockData.stock1Rate ? (
            <p>Stock 1: {formatToCurrency(stockData.stock1Rate)}</p>
          ) : null}
          {stockData.stock2Rate ? (
            <p>Stock 2: {formatToCurrency(stockData.stock2Rate)}</p>
          ) : null}
      </div>
    </div>
  )
}