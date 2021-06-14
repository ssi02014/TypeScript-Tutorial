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