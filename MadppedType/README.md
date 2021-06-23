# 💻 Mapped Type

Mapped Type 학습 내용

<br />

## 👨🏻‍💻 Mapped Type

### 🏃 Mapped Type 기본 문법

- 맵드 타입은 map 함수를 타입에 적용했다고 생각하면 된다.
- 맵드 타입은 기존에 있는 타입을 밑에 있는 mapped type 기본 문법을 이용해서 새로운 타입을 만드는 것이다.

```ts
  { [ P in K ] : T }
  { [ P in K ] ? : T }
  { readonly [ P in K ] : T }
  { readonly [ P in K ] ? : T }
```

<br />

### 🏃 Mapped Type 기본 예제

```ts
type Heroes = "Hulk" | "Capt" | "Thor"; //Union으로 감은 타입 별칭
type HeroAges = { [K in Heroes]: number };
//새로운 타입으로 변환
const ages: HeroAges = {
  Hulk: 33,
  Capt: 100,
  Thor: 1000,
};
```
