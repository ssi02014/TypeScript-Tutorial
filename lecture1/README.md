# 💻 TypeScript-Lecture-1
1강에 주요내용

<br />

## 👨🏻‍💻 타입스크립트 고유의 문법
### 🏃 타입 주석과 타입 추론
```ts
  let n: number = 1
  let m = 2
```
- 1행의 변수 n뒤에 콜론(:)과 타입 이름이 있다. 이것을 `타입주석(type annotation)`이라고 한다.
- 타입스크립트는 2행처럼 타입 부분을 생략할 수도 있다. 타입 부분이 생략되면 `대입 연산자(=)`의 오른쪽 값을 분석해 왼쪽 변수의 타입을 결정한다. 이를 `타입 추론(Type inference)`라고 한다.
- 타입스크립트의 타입 추론 기능은 자바스크립트 소스코드와 `호환성`을 보장하는데 큰 역할을 한다.
- 타입 추론 덕분에 자바스크립트로 작성된 `.js`파일을 확장자만 `.ts`로 바꾸면 타입스크립트 환경에서도 바로 동작한다.

<br />

### 🏃 인터페이스
```ts
  interface Person {
    name: string
    age?: number
  };

  let person: Person = { name: 'Jeon' };
```

<br />

### 🏃 튜플과 배열
```ts
  let numberArray: number[] = [1, 2, 3]; //배열
  let tuple = [boolean, number, string] = [true, 1, 'OK']; //튜플
```
- 튜플은 물리적으로 배열과 같다. 다만, 배열에 저장되는 아이템의 데이터 타입이 모두 같으면 배열, 다르면 튜플이다.

<br />

### 🏃 제네릭 타입
```ts
  class Container<T> {
    constructor(public value: T) { }
  }

  let numberContainer: Container<number> = new Container<number>(1);
  let stringContainer: Container<string> = new Container<string>('Hello world');
```
- 제네릭 타입은 다양한 타입을 한꺼번에 취급할 수 있게 해준다.
- 위 코드에서 Container 클래스는 value 속성을 포함합니다. 이 클래스는 `Container<number>`, `Container<string>`, `Container<number[]>`, `Container<boolean>` 처럼 여러 가지 타입을 대상으로 동작할 수 있는데 이를 `제네릭 타입(Generic type)` 이라고 한다.

<br />

### 🏃 대수 타입
```ts
  type NumberOrString = number | string; //합집합 타입 예
  type AnimanAndPerson = Animal & Person; //교집합 타입 예
```
- ADT란, `추상 데이터 타입(abstract data type)`을 의미하기도 하지만 `대수 타입(algebraic data type)`이라는 의미로도 사용된다.
- 대수 타입이란, 다른 자료형의 값을 가지는 자료형을 의미한다. 대수 타입에는 크게 `합집합 타입(union 또는 sum type)`과 `교집합 타입(intersection 또는 product type)` 두 가지가 있다.

<br />

## 👨🏻‍💻 타입스크립트 설치
- 타입스크립트 개발 환경은 Node.js 개발 환경과 똑같다. Node.js를 설치하고 Vscode와 Chrome 브라우저를 설치하면 바로 개발할 수 있다.

<br />

### 🏃 타입스크립트 컴파일러 설치
```
  npm i -g typescript
  tsc --version
```
- 이제 컴파일러 설치 후 `hello.ts`를 만들고, `tsc hello.ts` 명령어를 입력하면 `hello.js`파일이 만들어진다.

<br />

```
  node hello.'js
```
- 실행은 `node hello.js` 명령어로 실행해야 된다.

<br />

### 🏃 ts-node 설치
```
  npm i -g ts-node
```
- tsc는 타입스크립트 코드를 es5 형식으로 자바스크립트 코드로 변환만 할 뿐 실행하지는 않는다.
- 타입스크립트 코드를 ES5로 변환하고 실행까지 동시에 하려면 `ts-node`라는 프로그램을 설치해야 된다.

<br />

```
  ts-node hello.ts
```
- `ts-node hello.ts` 명령어로 컴파일과 실행을 동시에 진행한다.

<br />

## 👨🏻‍💻 타입스크립트 컴파일과 실행 오류 해결
![컴파일오류](https://user-images.githubusercontent.com/64779472/120423381-4041b400-c3a5-11eb-924a-cc7d408ff3c7.PNG)

- 오류) tsc : 이 시스템에서 스크립트를 실행할 수 없으므로 ~.ps1 파일을 로드할 수 없습니다.
- ts파일을 js파일로 컴파일할 때 위와 같은 오류가 뜨면 `Window PowerShell`을 관리자 모드로 실행시킨 뒤 다음과 같은 명령어를 입력하면 해결
