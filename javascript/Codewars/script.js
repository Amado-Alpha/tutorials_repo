'use strict';

/**
 * Task 01:
 * You probably know the "like" system from Facebook and other
 * pages. People can "like" blog posts, pictures or other items.
 * We want to create the text that should be displayed next to such an item.
 *
 * Implement the function which takes an array containing the names of people
 * that like an item. It must return the display text as shown in the examples:
 *
 * [] -->  "no one likes this"
 * ["Peter"]  -->  "Peter likes this"
 * ["Jacob", "Alex"] -->  "Jacob and Alex like this"
 * ["Max", "John", "Mark"] -->  "Max, John and Mark like this"
 * ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
 */

// 1. My approach
function likes(names) {
  switch (names.length) {
    case 0:
      return 'No one likes this';
    case 1:
      return `${names[0]} likes this`;
    case 2:
      return `${names[0]} and ${names[1]} like this`;
    case 3:
      return `${names[0]}, ${names[1]} and ${names[2]} like this`;
    default:
      return `${names[0]}, ${names[1]} and ${
        names.length - 2
      } others like this`;
  }
}
console.log(likes(['Alex', 'Jacob', 'Mark', 'Max']));

// 2. Alternative approach
function likes(names) {
  return {
    0: 'no one likes this',
    1: `${names[0]} likes this`,
    2: `${names[0]} and ${names[1]} like this`,
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`,
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`,
  }[Math.min(4, names.length)];
}

/**
 * Task 02: Digital root
 * Given n, take the sum of the digits of n. If that value has more
 * than one digit, continue reducing in this way until a single-digit
 * number is produced. The input will be a non-negative integer.
 *
 *  16  -->  1 + 6 = 7
   942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
  132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
  493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2

  In order of efficiency
  Alternative 02 > Alternative 01 > My approach.
 */

// 1. My approach
function digitalRoot(number) {
  let sum = [...number.toString()].reduce((a, b) => a + +b, 0);
  return sum > 9 ? digitalRoot(sum) : sum;
}
console.log(digitalRoot(493193));

// 2. Alternative 01
function digitalRootWhileLoop(number) {
  let sum = number;
  while (sum > 9) {
    sum = [...number.toString()].reduce((a, b) => a + +b, 0);
  }
  return sum;
}

console.log(digitalRoot(493193));

// 3. Alternative 02
/**
 * (n−1)%9+1
 */
function digitalRootMathFormula(number) {
  return ((number - 1) % 9) + 1;
}
