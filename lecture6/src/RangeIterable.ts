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
  console.log(value); // 1 2 3
}