export function makePerson(name: string, age: number) {
  return { name: name, age: age };
}

export function testMakePerson() {
  console.log(
    makePerson('Jeon', 27),
    makePerson('Park', 26)
  );
}