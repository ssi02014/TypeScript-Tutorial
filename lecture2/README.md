# 💻 TypeScript-Lecture-2
2강에 주요내용

<br />

## 👨🏻‍💻 타입스크립트 프로젝트 만들기
- 타입스크립트 개발은 Node.js 프로젝트를 만든 다음, 개발 언어를 타입스크립트로 설정하는 방식으로 진행된다.
- Node.js 프로젝트는 디렉터리를 하나 만들고 여기에 `package.json`이란 이름의 파일을 만드는 것으로 시작 된다.
- `package.json`은 Node.js가 관리하는 패키지 관리 파일로서 프로젝트 정보와 관련 패키지가 기록된다.

```json
  {
    "name": "lecture2",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
```

<br />

### 🏃 프로젝트 생성자 관점에서 패키지 설치하기
- `package.json`파일을 만들었으면 프로젝트 구현에 필요한 다양한 오픈소스 패키지를 `npm install`, `npm i`, `yarn add` 명령으로 설치가 가능합니다.
- 패키지 설치 명령 옵션
```
 --save: 프로젝트 실행할 때 필요한 패키지로 설치한다. 패키지 정보가 'dependencies' 항목에 등록된다.
 --save-dev: 프로젝트 개발할 때만 필요한 패키지로 설치한다. 'devDependencies' 항목에 등록 된다.

 --save 단축키: -S
 --save-dev 단축키: -D
```

<br />

- 타입스크립트에서는 보통 `typescript`와 `ts-node` 패키지를 설치한다.
- `-g`옵션을 통해 전역에 설치할 수 있지만, 프로젝트를 전달받아 이용하는 경우 `-D` 옵션으로 설치해 `package.json`에 등록한다.

```
  npm i -D typescript ts-node
  yarn global add typescript ts-node
```

<br />

### 🏃 타입스크립트 사용 시 유의할 점
- 타입스크립트는 기본적으로 ES6 자바스크립트 문법을 포함하고 있지만, 자바스크립트와는 다른 언어이다.
- 자바스크립트 컴파일러는 `a => a + 1`과 같은 코드를 동작시킬 수 있지만, 타입스크립트 컴파일러는 `(a:number): number => a + 1`처럼 타입이 명시적으로 설정되어 있어야만 코드가 문법에 맞게 작성되었는지를 검증해 코드를 동작시킨다.
- 이때문에 chance, ramda와 같은 자바스크립트 라이브러리들은 추가로 `@types/`를 앞에다 붙여서 타입 라이브러리들을 제공해야 한다.
- 그리고 타입 라이브러리들은 항상 `index.d.ts`라는 파일을 갖고 있으며, 타입스크립트 컴파일러는 이 파일의 내용을 바탕으로 chance, ramda와 같은 라이브러리가 제공하는 함수들을 올바르게 사용했는지 검증한다.
- 타입스크립트는 또한, `웹 브라우저`나 `Node.js`가 기본으로 제공하는 타입들의 존재도 그냥 알지 못한다. 예를 들어 `Promise`와 같은 타입을 사용하려면 `@types/node`라는 패키지를 설치해야 한다.

<br />

## 👨🏻‍💻 tsconfig.json
- 타입스크립트 프로젝트는 타입스크립트 컴파일러의 설정 파일인 `tsconfig.json`파일이 있어야 한다.
- 다음과 같은 명령어로 `tsconfig.json`을 만들 수 있다.

```
  tsc --init
```

- 위 명령어로 만들어진 `tsconfig.json`을 보면 실제 개발을 진행하는 데 필요한 많은 옵션이 비활성화 되어있다.
- 보통은 프로젝트에 필요한 옵션만 설정해서 간략하게 한다.

```json
  {
    "compilerOptions": {
      "target": "es5",                                
      "module": "commonjs",                         
      "sourceMap": true,
      "outDir": "dist",                             
      "downlevelIteration": true,                

      /* Strict Type-Checking Options */
      "strict": true,                                
      "noImplicitAny": true,                       

      /* Module Resolution Options */
      "moduleResolution": "node",      
      "baseUrl": "./",                             
      "paths": { 
        "*" : ["node_modules/*"]
      },                                 
      "esModuleInterop": true,

      /* Advanced Options */
      "skipLibCheck": true,                          
      "forceConsistentCasingInFileNames": true       
    },
    "include": ["src/**/*"]
  }
```
- `compilerOptions` 항목은 tsc 명령 형식에서 옵션을 나타내고, `include` 항목은 대상 파일 목록을 나타낸다.
- `include` 항목에서 `src/**/*`은 src 디렉터리는 물론 src의 하위 디렉터리에 있는 모든 파일을 컴파일 대상으로 포함한다는 의미이다.

<br />

## 👨🏻‍💻 tsconfig.json 살펴보기
### 🏃 module
- 타입스크립트 소스코드가 컴파일되어 만들어진 ES5 자바스크립트 코드는 `웹 브라우저`와 `Node.js` 양쪽에서 모두 동작해야 한다. 그런데 `웹 브라우저`와 `Node.js`는 물리적으로 동작하는 방식이 달라서 `여러 개의 파일(즉 모듈)`로 분할된 자바스크립트 코드 또한 `웹 브라우저`와 `Node.js` 양쪽에서 다르게 동작한다. 
- 자바스크립트 모듈은 웹브라우저에서는 `AMD(Asynchronous Module Definition)`방식으로 동작 한다.
- 자바스크립트 모듈은 Node.js에서는 `CommonJs` 방식으로 동작한다.
- 따라서, `tsconfig.json` 파일에서 `compilerOptions` 항목의 `module` 키는 동작 대상 플랫폼이 `웹 브라우저`인지 `Node.js`인지 구분해 그에 맞는 모듈 방식으로 컴파일하려는 목적으로 설정한다.

```
  웹브라우저: amd
  Node.js: commonJs
```

<br />

### 🏃 moduleResolution
- module키 값이 `commonJs`이면 `Node.js`에서 동작하는 것을 의미하므로, `moduleResolution` 키 값은 항상 `node`로 설정한다.
- 반면에 `amd`이면 `moduleResolution`키 값은 `classic`으로 설정한다.

<br />

### 🏃 target
- `target` 키에는 트랜스파일할 대상 자바스크립트 버전을 설정한다. 대부분 `es5`를 키값으로 설정한다.

<br />

### 🏃 baseUrl과 outDir
- `baseUrl`과 `outDir` 키에는 트랜스파일된 ES5 자바스크립트 파일을 저장하는 디렉터리를 설정한다.
- `tsc`는 `tsconfig.json`파일이 있는 디렉터리에서 실행된다. 따라서 현재 디렉터리를 의미하는 `"./"`로 baseUrl 키 값을 설정하는 것이 보통이다.
- `outDir`은 `baseUrl` 설정 값을 기준으로 했을 때 하위 디렉터리의 이름이다. `dist`라는 값을 주면 빌드된 결과가 dist 디렉터리에 만들어진다.

<br />

### 🏃 paths
- `paths`는 소스 파일의 import 문에서 from 부분을 해석할 때 찾아야 하는 디렉터리를 설정한다.
- import문이 찾아야 하는 소스가 외부 패키지이면 `node_modules` 디렉터리에서 찾아야 하므로 키 값에 `node_modules/*`도 포함했습니다. 

<br />

### 🏃 esModuleInterop
- 오픈소스 자바스크립트 라이브러리 중에는 `웹 브라우저`에서 동작한다는 것을 가정으로 만들어 진 것이 있다. 이들은 `commonJS` 방식으로 동작하는 타입스크립트 코드에 혼란을 줄 수 있다.
- 예로들면 `chance`가 바로 `AMD 방식`을 전제로 해서 구현된 라이브러리이다.
- chance 패키지가 동작하려면 `esModuleInterop` 키 값을 반드시 `true`로 해주어야 한다.

<br />

### 🏃 sourceMap
- sourceMap 키 값이 true이면 트랜스파일 디렉터리에는 `.js` 파일 이외에도 `js.map`파일이 만들어 진다.
- sourceMap 파일은 변화된 자바스크립트 코드가 타입스크립트 코드의 어디에 해당하는지를 알려준다. 
- sourceMap 파일은 주로 `디버깅` 할 때 사용한다.

<br />

### 🏃 downlevelIteration
- `생성기(generator)`구문이 정상적으로 동작하려면 `downlevelIteration`키 값을 반드시 `true`로 설정해야 한다.

<br />

### 🏃 nolmplicitAny
- 타입스크립트 컴파일러는 기본적으로 `f(a, b)` 처럼 매개변수 a, b에 타입을 명시하지 않은 코드일 경우 `f(a: any, b: any)`처럼 암시적으로 `any` 타입을 설정한 것으로 간주한다.
- 이런 형태의 코드는 타입스크립트 언어의 장점을 사용하는 것이 아니므로, `'a' 매개변수에는 암식으로 'any' 형식이 포함됩니다.` 라는 오류가 발생한다.
- 이 오류는 타입스크립트를 처음 배우는 사람을 혼란스럽게 하므로, 우선 `nolmplicitAny` 키 값을 `false`로 설정했다.
- `false`로 설정할 경우 타입을 지정하지 않더라도 문제로 인식하지 않는다. 문제로 인식하기 위해서는 키 값을 `true`로 바꾸면 된다.

<br />

## 👨🏻‍💻 src 디렉터리와 소스파일 만들기
### 🏃 src/utils/makePerson.ts
```ts
  export function makePerson(name: string, age: number) {
    return { name: name, age: age };
  }

  export function testMakePerson() {
    console.log(
      makePerson('Jeon', 27),
      makePerson('Park', 26)
    );
  }
```

<br />

### 🏃 src/index.ts
```ts
  import { testMakePerson } from './utils/makePerson';

  testMakePerson();
```

### 🏃 package.json 수정
```json
  {
    "name": "lecture2",
    "version": "1.0.0",
    "description": "",
    "main": "src/index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "ts-node src",
      "build": "tsc && node dist"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
```

<br />

- dev명령은 개발 중에 src 디렉터리에 있는 index.ts 파일을 실행하는 용도로 사용한다.
- build명령은 개발이 완료 된 후 프로그램을 배포하기 위해 dist 디렉터리에 ES5 자바스크립트 파일을 만들 때 사용한다.

<br />

- `index.ts`에서 ES5로 변환 된 `index.js`
```js
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });

  var makePerson_1 = require("./utils/makePerson");

  makePerson_1.testMakePerson();
  //# sourceMappingURL=index.js.map
```

<br />
