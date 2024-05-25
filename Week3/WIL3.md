# 1. HTTP 통신 메소드인 GET, POST, PUT, PATCH, DELETE를 직접 체험해보고 그 사용 사례를 정리하여 WIL3.md 파일에 정리한다.
### GET 매서드
![GET](https://github.com/Ryan0hwan/2024-1-Web-Study/assets/158720833/36605372-51d9-4d55-9f59-da9f771e46ac)
네이버에 "뉴진스 하니"를 검색해 보았다. query = 뉴진스 + 하니 인걸 확인.
GET 메서드도 POST 메서드와 같이 데이터를 담을 수 있는 메시지 바디가 존재한다. 하지만, GET 메서드의 메시지 바디를 확인하지 않는 서버가 대부분임으로 거의 사용되지 않는다. 그래서 쿼리를 사용해서, 데이터를 전달한다. 

### POST 매서드
![POST](https://github.com/Ryan0hwan/2024-1-Web-Study/assets/158720833/18c54c26-2854-4d70-9151-2935215de229)
개인 개발블로그에, 글 작성을 클릭해보니, POST매서드 확인이 가능하다.

### PUT 매서드
공식문서에 따르면, PUT과 POST의 차이는 멱등성이라고 한다.
멱등성이란, 동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니는 것을 의미한다.
![PUT](https://github.com/Ryan0hwan/2024-1-Web-Study/assets/158720833/5435b843-6517-48e0-ba6c-c1de21a48589)
그리고 PATCH와도 차이가 있는데, PUT요청 시, 리소스의 일부분만 보내면, 나머지는 모두 NULL이 된다.
일부만 수정. 부분수정을 하고 싶다면, PATCH를 써야한다. 

### PATCH 매서드
데이터 부분수정시 쓰인다.
![PATCH](https://github.com/Ryan0hwan/2024-1-Web-Study/assets/158720833/7c42b9e2-71c5-44f6-b39b-e658d12abe04)


### DELETE 매서드
URI을 통해서 어떤 데이터를 삭제할지를 정한다. 데이터 삭제라서 요청시 Body, Content-Type이 비어있다.
![DELETE](https://github.com/Ryan0hwan/2024-1-Web-Study/assets/158720833/7ce3c0ad-99c8-48f2-a0ab-e2830295ede9)


# 2. HTTP/1.1, HTTP/2, HTTP/3의 차이점을 학습하고 그 역사를  WIL3.md 파일에 정리한다.

HTTP란, 애플리케이션 계층 프로토콜인데, TCP/IP layer에서 최상위 계층임. 
데이터를 주고받고 하려면, 하위 계층을 반드시 지나야하는데, 
우선, 전송계층의 가장 대표적인 TCP, UDP에 대해 먼저 알 필요가 있음. 

### TCP vs UDP
연결방식 :  TCP는 연결형, UDP는 비연결형. 연결형이란, 데이터를 주고받기전에, 연결이 되었는가에 대한 확인과정을 거친다. 그 연결과정이 3-WAY Handshaking임. 
덕분에, TCP는 신뢰성이 높지만, 실행시간이 오래걸림.  UDP는 그반대

### HTTP/1.1  (TCP 사용)
먼저 HTTP/1.0의 경우, 한 연결당 하나의 요청을 처리하도록 설계 되어 있다.
이 방식은, 요청 시 매번 연결과 해제의 과정을 반복해야 하기에 RTT가 오래걸리는 문제가 존재. 
* RTT : 패킷이 목적지에 도달하고 나서 다시 출발지로 돌아오기까지 걸리는 시간(패킷 왕복시간)

HTTP/1.1은 위 방식에 몇가지를 보완함 (2.0출시 전, 약 15년동안 주로 사용될정도로 안정적.)
a. Persistent Connection 추가
매번 TCP연결을 하는 것이 아닌, 한번 TCP를 초기화 한 이후, keep/alive 옵션으로 일정시간동안 연결 상태를 유지

b. Pipelining추가
TCP 특성상 요청 후 응답을 기다려야하는 문제를 보완
클라이언트는 앞 요청의 응답을 기다리지 않고, 순차적으로 요청을 전송. 서버는 요청이 들어온 순서대로 응답
  "생각해보니까 어차피 다 필요하네??  그럼 일단 다 보내버리고 기다려"

* 한계 : HOL Blocking(Head Of Line Blocking) 문제
a. 앞의 요청(패킷)에 대한 응답이 늦어지면, 뒤의 모든 요청들은 모두 blocking되어 응답이 지연. 
b. 연속된 요청 간에 헤더의 많은 중복이 생기는 문제. 

### HTTP/2  (TCP 사용)
HTTP/1.x의 시간 지연문제와 헤더중복문제 해결 

a. Multiplexed streams(멀티 플렉싱)
HTTP/1.1의 Pipelining은 한번의 연결에 여러 요청을 보낼 순 있으나, 동시에 여러처리는 불가한 문제가 있었음.
하나의 커낵션 내에 여러개의 스트림(양방향 데이터 흐름)을 사용하여 송수신하고,
메세지가 이진화된 텍스트인 프레임(컴퓨터 친화적)으로 나뉘어 요청마다 구분되는 스트림을 통해 전달
프레임이 각 요청의 스트림을 통해 전달되며, 한 커넥션 안에 여러개의 스트림을 가질수 있게되며, 멀티플렉싱이 가능해짐. 
이제 각 요청의 응답 순서가 의미가 없어지므로, HOL Blocking문제 해결. 

b. Header Compression(헤더 압축)
요청과 응답 헤더의 메타데이터를 압축해서 기존의 연결요청에서의 중복헤더로 인한 오버헤드 문제 해결 
이전의 표시된 헤더를 제외한 필드를 허프만코딩을 활용해 압축. 
헤더의 크기가 약 85%나 줄었다고 한다. 

* 한계 : Server Push(서버 푸시)
클라이언트가 서버에 요청하지 않아도 클라이언트에게 필요한 리소스를 서버가 추가적으로 push해주는 기능이 있음.
하지만, 각 요청마다 stream으로 구분해 병렬적으로 처리함에도 TCP 고유의 HOL Blocking이 여전히 존재하는 문제가 있다.
다른 stream이 전송되면, 하나의 stream에서 유실이 발생되거나 문제가 생기면, 다른 stream은 기다려야함. 

2.0 만든게, 지연을 줄이는게 목적이었는데, 지연은 해결이 잘 안되었음. 


### HTTP/3 (UDP 사용)
TCP위에서 돌아가는 2.0버전과는 달리 QUIC라는 계층 위에서 돌아가며 TCP기반이 아닌 UDP기반. 
a. HTTP/2.0의 장점(멀티플레싱 등)은 똑같이 가져감
b. 초기 연결 시, 지연시간이 감소되는 특징을 가짐.(UDP의 대표 특징)
초기연결 시 3-way handshaking 과정을 거치지 않아 1-RTT만 소요.
클라이언트와 서버가 한번 신호를 주고받고 바로 통신 시작.
c. TCP의 stream은 하나의 chain으로 연결되는 것과 달리,
   각 stream당 독림된 stream chain을 구성하여, TCP의 HOL Blocking을 해결.
   "요청별로 다른 stream쓰면 되는거 아니야?"




# 참고자료
https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/PUT 
https://velog.io/@woply/HTTP-%EC%A3%BC%EC%9A%94-%EB%A9%94%EC%84%9C%EB%93%9C-5%EA%B0%80%EC%A7%80-%EC%A0%95%EB%A6%ACGET-POST-PUT-PATCH-DELETE
https://zu-techlog.tistory.com/113
https://youtu.be/Zyv1Sj43ykw?si=W2W0K2bEU2lP3LMb
https://youtu.be/IjxkKQvn8Bc?si=0llZaK7qtkIPHv2d 
https://parksb.github.io/article/24.html 