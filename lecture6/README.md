# 💻 TypeScript-Lecture-6
6강에 주요내용

<br />

## 👨🏻‍💻 반복기 이해하기
### 🏃 반복기와 반복기 제공자
- 프로그래밍 언어마다 조금씩 구현 방식이 다르긴 하지만, 대부분 프로그래밍 언어에서 반복기는 다음과 같은 특징이 있다.
```
  1. next라는 이름의 메서드를 제공한다.
  2. next메서드는 value와 done이라는 두 개의 속성을 가진 객체를 반환한다.
```

<br />

```ts
  export const createRangeIterable = (from: number, to: number) => {
    let currentValue = from;

    return {
      next() {
        const value = currentValue < to ? currentValue++ : undefined;
        const done = value === undefined; 
        return { value, done };
        // ex {1, false}, {2, false}, {3, false}, {4, true}
      }
    }
  }

  const iterator = createRangeIterable(1, 3 + 1);

  while (true) {
    const { value, done } = iterator.next(); //반복기 동작

    if(done) break;
    console.log(value); // 1 2 3 
  }
```
- createRangeIterable 함수는 next 메서드가 있는 객체를 반환하므로 이 함수는 반복기를 제공하는 역할을 한다. 이를 `반복기 제공자(iterable)`라고 한다.
- createRangeIterable 함수를 호출해 반복기를 얻고 iterator 변수에 저장한다.
- 반복기는 이처럼 반복기 제공자를 호출해야만 얻을 수 있다.

<br />

### 🏃 반복기는 왜 필요한가?
- iterator.next 메서드가 반복 호출될 때마다 각기 다른 값이 출력된다. 반복기 제공자가 생성한 값 1, 2 , 3을 배열에 담아서 출력하지 않고, 마치 for문을 돌면서 값을 콘솔 출력문으로 찍어낸 듯한 모습이다.
- 반복기 제공자는 이처럼 어떤 범위의 값을 한꺼번에 배열에 담지 않고 값이 필요할 때마다 생성한다.
```ts
  export const range = (from: number, to: number): number[] => {
    return from < to ? [from, ...range(from + 1, to)] : [];
  }
```
- createRangeIterable 함수는 값이 필요한 시점에 비로서 생성하지만, range 함수는 필요한 시점보다 이전에 미리 생성한다는 차이가 있다.
- 시스템 메모리의 효율성 관점에서 보면 createRangeIterable 함수가 메모리를 훨씬 적게 소모한다.

<br />

### 🏃 for...of문과 [Symobol.iteraotr] 메서드
- 위에 range 함수는 for...of 구문의 of 뒤에 올 수 있다.
- 그러나 createRangeIterable 함수를 for...of 구문에 적용하면 '[Symobol.iterator]()메서드가 없다'는 오류가 발생한다.

```ts
  const iterator = createRangeIterable(1, 3 + 1);
  for(let value of iterable) {
    console..og(value); //오류 발생
  }
```
- 여기서 발생한 오류는 createRangeIterable 함수를 클래스로 구현해야 한다는 것을 의미한다.

<br />

```ts
  export class RangeIterable {
    constructor(public from: number, public to: number) {}
    [Symbol.iterator]() {
      const that = this;
      
      let currentValue = that.from;
      
      return {
        next() {
          const value = currentValue < that.to ? currentValue++ : undefined;
          const done = value === undefined; 
          return { value, done };
        }
      }
    }
  }

  const iterator = new RangeIterable(1, 3 + 1);

  console.log(iterator); // RangeIterable { from: 1, to: 4 }

  for(let value of iterator) {
    console.log(value);
  }
```
- 참고 사항으로 클래스의 메서드는 자바스크립트의 function 키워드가 생략되었을 뿐 사실상 function 키워드로 만들어지는 함수이다.
- 그런데 function 키워드로 만들어지는 함수는 내부에서 this 키워드를 사용할 수 있다.
- RangeIterable 클래스에서 this 값을 `that 변수`에 담고 있는데, 이는 next 메서드 안에 있는 `to`를 위함이다. next 메서드 또한 function 키워드가 생략된 메서드이므로 컴파일러가 next의 this로 해석되지 않게 하는 자바스크립트의 유명한 코드 트릭이다.

<br />

### 🏃 iterable<T>와 iterator<T> 인터페이스
- 타입스크립트 반복기 제공자에 `iterable<T>`와 `iterator<T>` 제네릭 인터페이스를 사용할 수 있다. 
- `iterable<T>`는 다음처럼 자신을 구현하는 클래스가 `[Symobol.iteraotr]`메서드를 제공한다는 것을 명확하게 알려주는 역할을 한다.
```
  class 구현 클래스 implements Iterable<생성할 값의 타입> {}
```
- 또한, `Iterator<T>`는 반복기가 생성할 값의 타입을 명시해준다.
```
  [Symobol.iteraotr](): Iterator<생성할 값의 타입> {}
```

<br />

```ts
  export class StringIterable implements Iterable<string> {
    constructor(private strings: string[], private currentIndex: number = 0) {}

    [Symbol.iterator](): Iterator<string> {
      const that = this;

      let currentIndex = that.currentIndex;
      let length = that.strings.length;

      const iterator: Iterator<string> = {
        next(): { value: string, done: boolean } {
          const value = currentIndex < length ? that.strings[currentIndex++]: 'undefined';
          const done = value === 'undefined';

          return { value, done};
        }
      }
      return iterator;
    }
  }

  const IterableValue = new StringIterable(['hello', 'world', '!']);

  console.log(IterableValue); 
  //StringIterable { strings: [ 'hello', 'world', '!' ], currentIndex: 0 }

  for(let value of new StringIterable(['hello', 'world', '!'])) {
    console.log(value); //hello world !
  }
```

<br />

## 👨🏻‍💻 생성기 이해하기
- ESNext(ES6 이상) 자바스크립트와 타입스크립트는 `yield`라는 키워드를 제공한다. yield는 마치 return 처럼 값을 반환한다.
- yield는 `function*` 키워드를 사용한 함수에서만 호출할 수 있다.
- `function*` 키워드로 만든 함수를 `생성기(generator)`라고 한다.
```ts
  export function* generator() {
    console.log('generator started...');
    
    let value = 1;
    while(value < 4) {
      yield value++;
    }
    console.log('generator finished...');
  }

  for(let value of generator()) {
    console.log(value);
    /*
      출력
      generator started...
      1
      2
      3
      generator finished...
    */
  }
```

<br />

### 🏃 function* 키워드
- generator 함수는 지금까지 본 함수와 비교했을 때 다음 두 가지 차이가 있다.
```
  1. function* 키워드로 함수를 선언한다.
  2. 함수 몸통 안에 yield문이 있다.
```
- 즉 function* 키워드로 선언된 함수가 생성기인데, 생성기는 오직 function* 키워드로 선언해야 하므로 화살표 함수로는 생성기를 만들 수 없다.
- 생성기는 반복기를 제공하는 `반복기 제공자`로 동작한다.

<br />

### 🏃 yield 키워드
- 생성기 함수 안에서는 yield 함수를 사용할 수 있다. yield는 `연산자(operator)`형태로 동작하며 두 가지 기능을 한다.
```
  1. 반복기를 자동으로 만들어 준다.
  2. 반복기 제공자 역할도 수행한다.
```

<br />

```ts
  export function* rangeGenerator(from: number, to: number) {
    let value = from;
    while(value < to) {
      yield value++;
    }
  }

  let iterator = rangeGenerator(1, 3 + 1);

  while (true) {
    const { value, done } = iterator.next();

    if (done) break;
    console.log(value);
  }

  for(let value of rangeGenerator(4, 6 + 1)) {
    console.log(value);
  }
```
- 위 코드는 앞서 본 반복기 제공자 관련 코드와 크게 다르지 않는다.

<br />

### 🏃 반복기 제공자의 메서드로 동작하는 생성기 구현
- 생성기(generator)는 반복기를 제공하는 반복기 제공자로서 동작하므로, 생성기를 사용하면 StringIterable 클래스를 간결하게 구현할 수 있다.
```ts
  export class IterableUsingGenerator<T> implements Iterable<T> {
    constructor(private values: T[] = [], private currentIndex: number = 0) {}

    [Symbol.iterator] = function* () {
      while(this.currentIndex < this.values.length) {
        yield this.values[this.currentIndex++];
      }
    }
  }
```

<br />

### 🏃 yield* 키워드
- 타입스크립트는 yield 키워드 뒤에 *를 붙인 `yield*` 키워드도 제공한다. yield는 단순히 값을 대상으로 동작하지만, `yield*`는 다른 생성기나 배열을 대상으로 동작한다.
```ts
  function* gen12() {
    yield 1;
    yield 2;
  }

  function* gen12345() {
    yield* gen12();
    yield* [3, 4];
    yield 5;
  }

  for(let value of gen12345()) {
    console.log(value);
  }
```

<br />

### 🏃 yield 반환 값
- yield 연산자는 값을 반환한다.
```ts
  export function* gen() {
    let count = 5;
    let select = 0;
    
    while(count--) {
      select = yield `you select ${select}`;
    }
  }

  const random = (max: number, min: number = 0) => Math.round(Math.random() * (max - min)) + min;
  const iter = gen();

  while(true) {
    const { value, done } = iter.next(random(10, 1));
    
    if(done) break;
    console.log(value);
  }
```
- yield 연산자의 반환값은 반복기의 next 메서드 호출 때 매개변수에 전달하는 값이다.
- 위 코드 실행 결과는 이전에 next 메서드가 전달한 값이 다시 gen 함수의 내부 로직에 의해 현재의 value 값이 되어 출력된다.