import { useState, useEffect, useRef } from "react";
const UPBIT_URL = "wss://api.upbit.com/websocket/v1";
const useNewData = () => {
  const [result, setResult] = useState();
  const [timer, setTimer] = useState(false);
  const data = [
    { ticket: "nexoneunji" },
    { type: "ticker", codes: ["KRW-BTC"], isOnlyRealtime: true },
  ];
  const ws = useRef(null);

  useEffect(() => {
    // timer 종료 시 트리거
    if (timer) {
      alert("만료되었습니다.");
      ws.current.close();
    }
  }, [timer]);

  useEffect(() => {
    // 10분 지나면 종료 처리
    setTimeout(() => {
      setTimer(true);
    }, 10 * 60 * 1000);

    ws.current = new WebSocket(UPBIT_URL);
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify(data));
    };
    ws.current.onclose = () => {
      console.log("DISCONNECTED");
    };
    ws.current.onmessage = async (event) => {
      const text = await new Response(event.data).text();
      const message = JSON.parse(text);
      const {
        opening_price,
        low_price,
        high_price,
        trade_price,
        timestamp,
        trade_volume,
      } = message;
      setResult({
        open: opening_price,
        low: low_price,
        high: high_price,
        // 종가 = 현재가
        close: trade_price,
        volume: trade_volume,
        // 오전 9시 기준 일봉
        timestamp:
          Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
        turnover:
          ((opening_price + low_price + high_price + trade_price) / 4) *
          trade_volume,
      });
    };
    ws.current.onerror = (event) => {
      console.log("Error", event);
      ws.current.close();
    };
    return () => {
      ws.current.close();
    };
  }, []);
  return result;
};

export default useNewData;
