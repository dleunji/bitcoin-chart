import axios from "axios"

const getInitialDataList = (unit) => {
  return axios.get(`https://api.upbit.com/v1/candles/days`, { params: {
    market: 'KRW-BTC',
    to: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ''),
    count: 200
  }})
    .then(res => res.data)
    .then((data)=>{
      return data.map((item)=> {
        const {opening_price, low_price, high_price, trade_price, timestamp, candle_acc_trade_volume} = item;
        return {
          open: opening_price,
          low: low_price,
          high: high_price,
          close: trade_price,
          volume: candle_acc_trade_volume,
          // 오전 9시 기준 일봉
          timestamp: Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
          turnover: (opening_price + low_price + high_price + trade_price) / 4 * candle_acc_trade_volume
        };
      });
    })
    .then((arr) => arr.reverse())
    .catch(err => {
      console.error(err);
    });
}

export default getInitialDataList;