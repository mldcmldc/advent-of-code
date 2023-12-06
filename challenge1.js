const fs = require("fs");

const numbersAsText = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function findNumberAsText(input, shouldStartFromEnd = false) {
  let obj = {};
  let count = 0;

  for (const [key, value] of Object.entries(numbersAsText)) {
    if (input.includes(key)) {
      const search = input.search(key);
      if (search != -1) obj[value] = search;
    }

    count++;
  }

  const values = Object.values(obj);
  if (values.length === 0) return null;

  const fn = shouldStartFromEnd ? Math.max : Math.min;

  const minValue = fn(...values);
  const result = Object.entries(obj).find((entry) => entry[1] === minValue);

  return result[0];
}

function getFirstAndLastNumber(input) {
  const firstNumber = input.split("").find((x) => !isNaN(x));
  const firstNumberIndex =
    input.indexOf(firstNumber) == -1
      ? input.length
      : input.indexOf(firstNumber);
  const firstSegment = input.slice(0, firstNumberIndex);
  const firstNum = findNumberAsText(firstSegment) ?? firstNumber;

  if (!firstNum && !firstSegment) return 0;

  const lastNumber = input.split("").findLast((x) => !isNaN(x));
  const lastNumberIndex =
    input.lastIndexOf(lastNumber) == -1 ? 0 : input.lastIndexOf(lastNumber) + 1;
  const lastSegment = input.slice(lastNumberIndex, input.length);
  const lastNum = findNumberAsText(lastSegment, true) ?? lastNumber;

  console.log(firstNum + lastNum);

  return firstNum + lastNum;
}

fs.readFile("data.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const dataArray = data.split("\n");

  const sum = dataArray.reduce(
    (acc, curr) => acc + Number(getFirstAndLastNumber(curr)),
    0,
  );

  console.log(sum);

  console.log("here");
  getFirstAndLastNumber("feightwo4twofivefour");
});
