import React, {useState, useEffect} from 'react';

import axios from 'axios';
// TODO: 단위 파라미터
const useInitialDataList = async (unit) => {
  const [initialDataList, setInitialDataList] = useState([]);
  useEffect(async()=>{
    await axios.get(`https://api.upbit.com/v1/candles/minutes/${unit}`, {params: {
      market: 'KRW-BTC',
      to: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ''),
      count: 10
    }})
      .then(res => res.data)
      .then((data)=>{
        data.forEach((item)=> {
          const {opening_price, low_price, high_price, trade_price, candle_acc_trade_volume, timestamp} = item;
          const newItem = {
            open: opening_price,
            low: low_price,
            high: high_price,
            close: trade_price,
            volume: candle_acc_trade_volume,
            timestamp
          };
          setInitialDataList([...initialDataList, newItem]);
        });
      })
      .catch(err => {
        console.error(err);
      })
  },[]);
  return [initialDataList];
}

export default useInitialDataList;