import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockChart = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);

  const API_URL = 'http://20.244.56.144/evaluation-service/stocks';
  const API_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODkyNTk5LCJpYXQiOjE3NDc4OTIyOTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhlNDExY2M3LWVkZTgtNDg5ZC05MmY0LTA2Y2IwMThmMDNjZCIsInN1YiI6IjIyMDAwMzA0NDljc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzA0NDljc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJwLm1hbmlzd2Fyb29wIiwicm9sbE5vIjoiMjIwMDAzMDQ0OSIsImFjY2Vzc0NvZGUiOiJiZVRKakoiLCJjbGllbnRJRCI6IjhlNDExY2M3LWVkZTgtNDg5ZC05MmY0LTA2Y2IwMThmMDNjZCIsImNsaWVudFNlY3JldCI6IlZ3VUd2U2RkWnhDZ3lBZk4ifQ.zRQiWvqW8sNFqHhCRCy1t-105q7wo9V78yB19kigvTg';

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null); 

      try {
        // Make the API request
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`, 
          },
        });

        console.log('API Response:', response);  // Log the entire response

        // If the API is returning data, set it
        if (response.data) {
          setStockData(response.data);
        } else {
          setError('No data found.');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError(error.message || 'Error fetching stock data.');
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) {
    return <div>Loading stock data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Stock Data for {symbol}</h2>
     
      <pre>{JSON.stringify(stockData, null, 2)}</pre>
    </div>
  );
};

export default StockChart;
