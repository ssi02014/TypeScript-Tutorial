export class C {
  static whoAreYou(): string {
    return `I'm class C`;
  }
}

export class D {
  static whoAreYou(): string {
    return `I'm class D`;
  }

  hi(): string {
    return `hi`;
  }
}

console.log(C.whoAreYou());
console.log(D.whoAreYou());

let d:D = new D;

console.log(d.hi());