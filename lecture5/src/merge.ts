const mergeArray = <T>(...arrays: readonly T[][]):T[] => {
  let result: T[] = [];

  for(let i = 0; i < arrays.length; i++) {
    const array: T[] = arrays[i];

    result = [...result, ...array];
  }
  return result
}

const mergedArray1: string[] = mergeArray(['Hello'], ['world']);

console.log(mergedArray1);

const mergedArray2: number[] = mergeArray([1], [2, 3], [4, 5, 6], [7, 8, 9, 10]);

console.log(mergedArray2);