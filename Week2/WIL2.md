# JavaScript가 DOM에 어떻게 접근하고 적용될까?

우선 DOM (=문서객체모델)은 웹 페이지(HTML이나 XML 문서)의 콘텐츠 및 구조, 그리고 스타일 요소를 구조화 시켜 표현하여 프로그래밍 언어가 해당 문서에 접근하여 읽고 조작할 수 있도록 API를 제공하는 일종의 인터페이스입니다. 즉 자바스크립트 같은 스크립팅 언어가 쉽게 웹 페이지에 접근하여 조작할 수 있게끔 연결시켜주는 역할을 담당합니다.

* JavaScript의 DOM 접근 매서드를 통한 접근

자바스크립트로 DOM에 접근하는 방법은, DOM의 인터페이스를 이용하여 접근할 수 있습니다. 
기본적으로 브라우저 내부에 내장된 프로그래밍 언어(즉 자바스크립트)가 DOM의 API 중 자주 쓰는 메소드와 프로퍼티가 있다. 

이 매서드들을 통해, 동적으로 노드를 생성하고, 수정 및 삭제를 한다.
아래는 하나의 예시.

1. 노드 생성
const div = document.createElement('div') // div라는 변수에 div노드 할당하기. 이제 div변수 불러오면, 태그가 뜸.

2. 노드 붙이기 (부모 노드에 접근 후 붙임)
<!DOCTYPE html>
<html lang = "en">
<head>
  <meta chatset = "UTF-8">
  <meta http-equiv = "X-UA-Compatible" content = "IE=edge">
  <meta name = "viewport" content = "width-device-width, initial-sacle = 1.0">
  <title>Document</title>
</head>
<body>
</body>
</html>

위 파일은 html초기 파일이다. body안이 비어있는데, div노드를 붙이려면 body를 부모노드로 설정하고 접근하여,
append() or appendChild()매서드를 사용해서 붙이면 된다.

document.body.append(div)
document.body.appendChild(div)

3. 노드 변경하기

노드 내부에 어떤 변경이 일어난다? -> Dom은 업데이트를 진행하고, 다시 랜더링하여 화면에 보여준다.
노드 안에 텍스트를 집어넣어서 간단히 그 과정을 확인해볼 수 있다.

<!DOCTYPE html>
<html lang = "en">
<head>
  <meta chatset = "UTF-8">
  <meta http-equiv = "X-UA-Compatible" content = "IE=edge">
  <meta name = "viewport" content = "width-device-width, initial-sacle = 1.0">
  <title>Document</title>
</head>
<body>
  <script>
     let div = document.createElement('div');
     document.body.append(div);
     div.textContent = 'GDSC';
  </script>
</body>
</html>

공부하는 김에, 인라인으로 그냥 작성해보았다.
확인해보면, 동적으로 노드가 잘 생성된다.

4. 노드 삭제

그냥 같은 방식으로 아래 매서드들을 이용해서 삭제한다.
div.remove()  // 자식 태그에 접근해서 제거. 
document.body.removeChild(div)  // 반드시 부모 태그에 접근해서 자식노드를 제거


# 브라우저를 이루는 컴포넌트 중, JavaScript Engine은 무엇이고 어떤 일을 할까?

JavaScript Engine이란, 간단히 말하면, 자바스크립트 코드를 실행시키는 컴퓨터 프로그램이다.
자바스크립트를 읽어서 컴퓨터가 읽을 수 있는 기계어로 변환해주는 역할을 한다.
모든 브라우저들은 각각 고유의 JavaScript Engine을 가지고 있는데, 그 중 가장 유명한 것이 구글의 V-8엔진이다.
V-8엔진은 크롬과 node.js에서 작동한다.

* 먼저 내부구조를 뜯어보면, 모든 JavaScript Engine은 Call Stack과 Heap을 가지고 있다.
Call Stack : 우리의 코드가 실행되는 곳. execution contexts를 통해 실행된다.
Heap : 구조화 되지 않은 memory pool로, 어플리케이션에 필요한 변수와 개체가 할당되는 곳이다.

JavaScript Engine은 컴파일 할 때, 컴파일러 or 인터프리터가 아닌, JIT컴파일을 사용한다.
컴파일러와 인터프리터를 섞어 성능이 높은 컴파일 방식. 2단계로 구성된 컴파일 방식을 사용.
다른 특징으로는, portable 파일 없이 실행시켜, 실행이 컴파일 직후에 일어난다.

# inline CSS가 항상 좋은 것일까? 아니라면 그 이유는 무엇일까?

1. 코드의 재사용성이 떨어진다.
   인라인 스타일은 요소마다 개별적으로 작성되기 때문에, 코드의 재사용성이 떨어짐.

2. 유지보수가 어렵다.
   HTML코드가 복잡해지고, 가독성이 떨어짐.

3. 우선순위 문제가 발생할 수도 있다.
   인라인 스타일은 다른 스타일보다 우선시되므로, 추후 스타일 우선순위에 관한 문제가 발생할 수 있음.

따라서, CSS모듈을 사용한 스타일링이 효과적이다.
BUT, 동적으로 클래스 이름을 생성해야 하는 경우, 추가적인 작업이 필요하다는 단점도 존재함.
이런 단점에도, 장점이 이를 상쇄하기에, CSS모듈을 사용한 스타일링이 더 나음.