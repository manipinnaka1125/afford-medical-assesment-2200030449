import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Stockapi = ({ symbol }) => {
  const [data, setData]=useState(null);
  const [isLoading, setIsLoading]=useState(true);
  const [errorMessage, setErrorMessage]=useState(null);
const Api_url='http://20.244.56.144/evaluation-service/stocks';
  const Api_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODkyNTk5LCJpYXQiOjE3NDc4OTIyOTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhlNDExY2M3LWVkZTgtNDg5ZC05MmY0LTA2Y2IwMThmMDNjZCIsInN1YiI6IjIyMDAwMzA0NDljc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzA0NDljc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJwLm1hbmlzd2Fyb29wIiwicm9sbE5vIjoiMjIwMDAzMDQ0OSIsImFjY2Vzc0NvZGUiOiJiZVRKakoiLCJjbGllbnRJRCI6IjhlNDExY2M3LWVkZTgtNDg5ZC05MmY0LTA2Y2IwMThmMDNjZCIsImNsaWVudFNlY3JldCI6IlZ3VUd2U2RkWnhDZ3lBZk4ifQ.zRQiWvqW8sNFqHhCRCy1t-105q7wo9V78yB19kigvTg';
  useEffect(()=>{
    const getStockData=async()=>{
    setIsLoading(true);
    setErrorMessage(null);
      try {
        const response=await axios.get(Api_url, {
          headers:{
            Authorization:`Bearer ${Api_token}`,
          },
        });
        if(response.data) {
          setData(response.data);
        }else{
          setErrorMessage('No stock data available.');
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error while fetching stock data:', err);
      }
    };
    getStockData();
  }, [symbol]);

  if (isLoading) {
    return <div>Loding the stocks infos</div>;
  }
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <div>
      <h2>Stock Information for{symbol}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
 <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Close</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((stock, index) => (
            <tr key={index}>
              <td>{stock.date}</td>
              <td>{stock.open}</td>
              <td>{stock.close}</td>
              <td>{stock.high}</td>
              <td>{stock.low}</td>
              <td>{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stockapi;
