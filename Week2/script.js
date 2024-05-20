 // 글자 색 바꾸기, 글자 입력 기능
var title = document.getElementById('title');
var red = document.getElementById('red');
var blue = document.getElementById('blue');
var green = document.getElementById('green');
var changeTextBtn = document.getElementById('changeTextBtn');
var textInput = document.getElementById('textInput');

red.addEventListener('click', function() {
  title.style.color = 'red';              // 빨간색을 클릭하면, 제목의 색을 빨간색으로 바꾸는 기능.
});

blue.addEventListener('click', function() {
  title.style.color = 'blue';
});

green.addEventListener('click', function() {
  title.style.color = 'green';
});

changeTextBtn.addEventListener('click', function() {
  var newText = textInput.value;
  title.textContent = newText;
});

  // 계산기 기능
var calculateButton = document.getElementById('calculate');
var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var operatorSelect = document.getElementById('operator');
var resultParagraph = document.getElementById('result');


calculateButton.addEventListener('click', function() {
  var num1 = parseFloat(num1Input.value);  // parseFloat를 통해 문자형을 숫자로 변환함.
  var num2 = parseFloat(num2Input.value);
  var operator = operatorSelect.value;
  var result;
  switch(operator) {                    // 연산자 선택에 따른 result값 저장.
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      result = '잘못된 연산자';
  }
  resultParagraph.textContent = '결과: ' + result;
});

  // 타이머 기능
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var minutesInput = document.getElementById('m');
var secondsInput = document.getElementById('s');
var timerParagraph = document.getElementById('t');
var timerInterval;

startButton.addEventListener('click', function() {
  var minutes = parseInt(minutesInput.value);                // 정수형으로 바꿔서 새로저장.  숫자가 아니면, Nan출력
  var seconds = parseInt(secondsInput.value);
  var totalSeconds = minutes * 60 + seconds;                 // 초 단위로 환산해서 합산
  if (totalSeconds <= 0 || isNaN(totalSeconds)) {return;}    // 0보다 작거나, 값이 숫자가 아니라면. 종료.

  timerInterval = setInterval(function() {                 // 뒤에 매개변수가 1000(ms) = 1초. 1초마다 앞 함수를 실행
    totalSeconds--;                                        // 1초씩 감소
    var minutesRemaining = Math.floor(totalSeconds / 60);  // 분단위로 바꿈. 
    var secondsRemaining = totalSeconds % 60;              // 몇분 몇초에서  몇초를 의미. 
    timerParagraph.textContent = minutesRemaining + '분 ' + secondsRemaining + '초 남음';   // 위에서 변환한걸 한글로 출력. 
    if (totalSeconds <= 0) {                              // 시간 지나면
      clearInterval(timerInterval);                       // 이 함수 제거
      timerParagraph.textContent = '타이머 종료';          // 시간 지나면, "타이머 종료" 출력 
    }
  }, 1000);
});

stopButton.addEventListener('click', function() {     // 중지.  clearInterval은 내장함수. 
  clearInterval(timerInterval);                       // timeInterval 함수 제거
  timerParagraph.textContent = '타이머 중지';          // "타이머 중지" 출력
});