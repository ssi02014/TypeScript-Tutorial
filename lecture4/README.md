# 💻 TypeScript-Lecture-4
4강에 주요내용

<br />

## 👨🏻‍💻 함수 선언문
- 타입스크립트 함수 선언문은 자바스크립트 함수 선언문에서 매개변수와 함수 반환 값(return type)에 타입 주석을 붙이는 형태로 구성된다.
```ts
  function 함수 이름(매개변수1: 타입1, 매개변수2: 타입2): 반환값 타입 {
    함수 몸통
  }

  function add(a: number b: number): number {
    return a + b
  }
```

<br />

### 🏃 매개변수와 인자
- 일반적으로 `parameter`는 매개 변수라 하고, `argument`는 인수 혹은 인자라고 한다.
- 매개 변수는 함수 선언문에서 함수 이름 뒤 괄호 안에 선언하는 변수이다.
- 인자는 함수를 호출할 때 전달하는 값이다.

<br />

### 🏃 매개변수와 반환값의 타입 주석
- 변수 때와 마찬가지로 함수 선언문에서도 매개변수와 반환값에 대한 `타입 주석`을 생략할 수 있다.
- 하지만 이는 바람직하지 않다. 왜냐하면 타입이 생략되어 있으면 함수의 구현 의도를 알기 어렵고 잘못 사용하기 쉽기 때문이다.

<br />

### 🏃 void 타입
- `void`는 값을 반환하지 않는 함수의 반환 타입이다.
- `void` 타입은 함수 반환 타입으로만 사용할 수 있다.
```ts
  function printMe(name: string, age: number): void {
    console.log(`name: ${name}, age: ${age}`);
  }
```

<br />

### 🏃 함수 시그니처
- 변수에 타입이 있듯이 함수 또한 타입이 있다. 함수의 타입을 `함수 시그니처(function signature)`라고 한다.
```ts
  let printMe: (string, number) => void = function(name: string, age: number): void {};
```

<br />

### 🏃 type 키워드로 타입 별칭 만들기
- 타입스크립트는 `type`이라는 키워드를 제공한다. `type`키워드는 기존에 존재하는 타입을 단순히 이름만 바꿔서 사용하 수 있게 해준다.
- 위와 같은 기능은 `타입 별칭(type alias)`라고 한다.
- 함수의 타입, 즉 함수 시그니처를 명시하면 `매개변수의 개수`나 `타입`, `반환 타입`이 다른 함수를 선언하는 잘못을 미연에 방지할 수 있다.
```ts
  // 타입 생략 (비추천. 특히 함수에서는 타입을 꼼꼼히 달아두자.)
  let test1 = (a, b) => {
    return a + b;
  };

  // 타입 주석
  let test2 = (a: number, b: number): number => {
    return a + b;
  };

  // 함수 시그니처 이용. type 키워드를 이용해 타입 별칭 만듦
  type addNumber = (arg2: number, arg1: number) => number;

  let test3: addNumber = (a, b) => {
    return a + b;
  };
```

<br />

### 🏃 선택적 매개 변수
- 인터페이스의 선택 속성 처럼 함수의 매개변수에도 이름 뒤에 `물음표`를 붙일 수 있다. 이를 `선택적 매개변수(optional parameter)`라고 한다.
```ts
  //타입 주석
  function fn(arg1: string, arg2?: number): void {
    console.log(`arg2: ${arg2}`);
  }

  fn('hello', 1) //arg: 1
  fn('hello') //arg: undefined

  //함수의 시그니처
  type OptionalArgFunc = (string, number?) => void;
```

<br />

## 👨🏻‍💻 함수 표현식
- 프로그래밍 언어에서 `표현식(express)`이라는 용어는 `리터럴(literal)`, `연산자(operator)`, `변수(variable)`, `함수 호출(functionc all)` 등이 복합적으로 구성된 코드 형태를 의미한다.
- 예로 들어, `1 + 2`는 1과 2라는 리터럴과 덧셈 연산자 +로 구성된 표현식이다.
- 표현식은 항상 `컴파일러`에 의해 `계산법(evaluation)`이 적용되어 어떤 값이 된다.

<br />

### 🏃 함수 표현식
```ts
//함수 표현식
  function(a, b) {
    return a + b;
  }
```

<br />

### 🏃 계산법
- 컴파일러는 표현식을 만나면 `계산법(evaluation)`을 적용해 어떤 값을 만든다.
- 계산법에는 `조급한 계산법(eager evaluation)`과 `느긋한(또는 지연) 계산법(lazy evaluation)` 두 가지가 있다.
- 컴파일러가 `1 + 2` 라는 표현식을 만나면 조급한 계산법을 적용해 3이라는 값을 만든다.
- `function(a, b) { return a + b; }`라는 함수 표현식을 만나면, 심벌a와 b가 어떤 값인지 알 수 없어서 느긋한 계산법을 적용한다.

<br />

### 🏃 함수 호출 연산자
- 어떤 변수가 함수 표현식을 담고 있다면, 변수 이름 뒤에 `함수 호출 연산자(function call operator)` 즉 `( )`를 붙여서 호출할 수 있다.
- `함수 호출`이란, 함수 표현식의 몸통 부분을 실행한다는 뜻이다. 만약, 매개변수를 요구한다면 `()`안에 필요한 매개변수를 명시할 수 있다.
- 컴파일러는 함수 호출문을 만나면 지금까지 미뤘던 함수 표현식에 `조급한 계산법`을 적용해 함수 표현식을 `값`으로 바꾼다.
```ts

  let functionExpression = function(a: number, b: number): number { return a + b; }
  let value = functionExpression(1, 2);

  console.log(value); //3
```

<br />

## 👨🏻‍💻 화살표 함수와 표현식 문
- ESNext(ES6 이후)부터는 function 키워드가 아닌 `=>` 기호로 만드는 화살표 함수도 제공한다.
- 화살표 함수의 몸통은 function때와는 다르게 중괄호를 사용할 수도 있고, 생략할 수도 있다.
- 그런데 흥미롭게도 중괄호 사용 여부에 따라 타입스크립트 문법이 동작하는 방식이 `실행문(execution statement)`과 `표현식 문(expression statement)`방식으로 달라진다.
```ts
  const arrow1 = (a: number, b: number): number => { return a + b };
  const arrow2 = (a: number, b: number): number => a + b;
```

<br />

### 🏃 실행문과 표현식문
- 프로그래밍 언어는 `실행문 지향 언어(execution-oriented language)`와 `표현식 지향 언어(express-oriented language)`로 구분되어 왔다.
- C언어가 대표적인 실행문 지향 언어이며, 스칼라가 대표적인 표현식 지향 언어이다.
- 자바스크립트는 ES5는 실행문 지향언이며, ES6와 TypeScript는 실행문과 표현식 문을 동시에 지원하다. 이런 언어를 `다중 패러다임 언어(multi-paradigm language)`라고 한다.
- 프로그래밍 언어에서 실행문은 `CPU에서 실행되는 코드`를 말한다. 실행문이 실행된 결과를 알려면 반드시 `return` 키워드를 사용해야 한다.
- 표현식 문은 CPU에서 실행된 결과를 굳이 `return` 키워드를 사용하지 않아도 알려준다.

<br />

```ts
  let x
  x = 1
```
- 변수에 값을 대입하는 것은 대표적인 실행문이다.

<br />

- 반면에 밑에 코드처럼 x > 0 부분은 CPU가 평가 한 후 true나 false라는 값으로 결과를 알려주지 않으면 if문이 정상적으로 동작할 수 없다.
```ts
  let x = 10;
  if (x > 0) x = 1
```
- 하지만 만일 프로그래밍 문법이 밑에 코드와 같다면 코드를 작성하기가 상당히 번거로워 진다.
```ts
  if (return x > 0) x = 1;
```
- 즉, 똑같이 CPU에서 실행되는 구문이라도 `x > 0`처럼 return 키워드 없이 결괏값을 반환하는 실행문이 필요하다. 이를 `표현식 문`이라고 구분해서 부른다.
