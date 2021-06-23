# 💻 Utility Type

Utility Type 학습 내용

<br />

## 👨🏻‍💻 Utility Type

### 🏃 Partial

- 파셜(Partial)타입은 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있다.

```ts
interface Address {
  email: string;
  address: string;
}

type MayHaveEmail = Partial<Address>;
const me: MayHaveEmail = {}; // 가능
const you: MayHaveEmail = { email: "test@abc.com" }; // 가능
const all: MayHaveEmail = { email: "capt@hero.com", address: "Pangyo" }; // 가능
```

<br />

### 🏃 Pick

- 픽(Pick)타입은 특정 타입에서 몇 개의 속성을 선택(pick)하여 타입을 정의할 수 있다.

```ts
interface Produce {
  id: number;
  name: string;
  price: number;
  brand: string;
  storck: number;
}

function displayProductDetail(
  shoppingItem: Pick<Product, "id" | "name" | "price">
) { ... }
```

<br />

### 🏃 Omit

- 오밋(Omit) 타입은 특정 타입에서 지정된 속성만 제거한 타입을 정의해 준다.

```ts
interface AddressBook {
  name: string;
  phone: number;
  address: string;
  company: string;
}
const phoneBook: Omit<AddressBook, "address"> = {
  name: "재택근무",
  phone: 12342223333,
  company: "내 방",
};
const chingtao: Omit<AddressBook, "address" | "company"> = {
  name: "중국집",
  phone: 44455557777,
};
```
