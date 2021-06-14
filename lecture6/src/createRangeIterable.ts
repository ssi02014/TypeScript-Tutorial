export const createRangeIterable = (from: number, to: number) => {
  let currentValue = from;
  return {
    next() {
      const value = currentValue < to ? currentValue++ : undefined;
      const done = value === undefined; 
      return { value, done } // ex {1, false}, {2, false}, {3, false}, {4, true}
    }
  }
}

const iterator = createRangeIterable(1, 3 + 1);

while (true) {
  const { value, done } = iterator.next(); //반복기 동작

  if(done) break;
  console.log(value); //1 2 3 
}