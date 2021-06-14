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