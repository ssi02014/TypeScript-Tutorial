class A {
  constructor(value) {
    this.value = value;
  }

  method() {
    console.log(`value: ${this.value}`);
  }
}

let a = new A(2);
a.method();
