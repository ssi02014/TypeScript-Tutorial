export const range = (from: number, to: number): number[] => {
  return from < to ? [from, ...range(from + 1, to)] : [];
}

let numbers: number[] = range(1, 10);

console.log(numbers);