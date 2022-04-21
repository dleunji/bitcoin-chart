# 📈WebSocket으로 실시간 비트코인 차트 그리기

![리액트 캡처](https://user-images.githubusercontent.com/46207836/164382083-82a2e92b-d922-4c1f-b8ad-bb443e7edd93.PNG)

WebSocket을 활용해보기 위해서 [업비트에서 제공하는 시세 Open API](https://confluence.nexon.com/pages/viewpage.action?pageId=508897515)를 수신하여 실시간으로 비트코인 차트를 그렸다.

## ✔︎ WebSocket

TCP 기반의 프로토콜로서, 기존의 일방향적인 HTTP 통신과 다르게 한 차례의 Handshake를 나눈 후에 서버와 클라이언트 간에 연결이 지속되어 양방향 통신이 가능하다. React에서 사용 시 리소스 누수를 방지하기 위해 반드시 종료 시 WebSocket을 Close해야 한다.

자세한 내용은 [MDN](https://developer.mozilla.org/ko/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)을 참고한다.



## ✔︎ 차트 라이브러리

[KLineChart](https://github.com/liihuu/KLineChart)를 이용해 일자별로 봉이 그려지도록 하였다. 

주식 시장과 다르게 장 마감이 없다는 특성을 고려해 시간대를 결정해 일자를 나누었다.

참고로 우리나라 주요 거래소마다 봉단위가 다르다. 

업비트의 경우 우리나라 시간대 기준이나, 빗*의 경우에는 영국 표준시 기준으로 차트가 그려진다.



