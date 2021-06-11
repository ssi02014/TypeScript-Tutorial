export const pureSort = <T>(array: readonly T[]): T[] => {
  let deepCopied = [...array];
  return deepCopied.sort();
}

let beforeSort: number[] = [6, 2, 9, 0];
const afterSort = pureSort(beforeSort);

console.log(beforeSort, afterSort);