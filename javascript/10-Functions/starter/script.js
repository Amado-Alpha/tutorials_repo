'use strict';

// Learning function with default parameters.
const bookings = [];

const createBookings = function (
  flightNum,
  numPassengers = 10,
  price = 20 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBookings('LH123');
createBookings('LH123', 5);
createBookings('LH123', 5, 12);

// Skipping a parameter to let it use its default value
createBookings('LH123', undefined, 12);

// How passing arguments work

// Passing in primitives(int, str, bool) and reference types(objects)

const flight = 'LH203';
const jonas = {
  name: 'Jonas',
  passport: 12345678,
};

const checkIn = function (flightNum, passenger) {
  // Attempting to change the parameters

  flightNum = 'BOE3412';
  passenger.name = 'Mr' + passenger.name;

  /*
        flightNum won't be changed to 'BOE3412' because, it is an exact
        copy of the outside variable with its init value of 'LH203' and
        that is the case with all primitive parameters passed to the fu
        ction as arguments.

        However, the passenger.name will undergo the defined changes be
        cause the parameter passenger passed in is just a memmory refere
        nce of the jonas object in the heap. (The reference will point to
        the same object)
    */

  // if (passenger.passport = 12345678) {
  //     alert('Checked In');
  // } else {
  //     alert('Wrong passport!');
  // }
};

console.log(checkIn(flight, jonas));
console.log(flight);
console.log(jonas);

// Creating another function function that mutates the same object
// You need to be very careful when doing this

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(jonas);
checkIn(flight, jonas);

/*
    IMPORTANT: JS doesn't have passing by reference, only passing by value
    Many other programming languages have passing by reference but not JS
*/

/* 
    TOPIC 02 (FIRST CLASS AND HIGHER-ORDER FUNCTIONS)

    FIRST CLASS FUNCTIONS can be simply explained by the property 
    of JS that enables functions to be treated just as values.

    eg. const add = (a,b) => return a + b;

    HIGHER ORDER FUNCTIONS are functions that accept other functions 
    as argument and returns a new function or both.

    eg. const greet = () => console.log('Hey Alphie');

        btnClose.addEventListener('click', greet);

        addEventListener is the HIGHER ORDER FUNCTION here.

*/

/* 
    FUNCTIONS CALLING OTHER FUNCTIONS

    USE CASE: Functional programming
*/

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Johnny');

// Or can be called as below and would produce same results

greet('Hey there')('Alphie');

// Re-writing the above implementation using arrow functions

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

greetArrow('Hey by Arrow')('Alphie');

/*
    CALLING THE this KEYWORD manually and why we would do that
*/

const tahmeed = {
  bus: 'marcopolo',
  route: 'Mombasa - Dar',
  bookings: [],

  book(name) {
    console.log(`${this.bus} ${this.route}`);

    this.bookings.push({ route: `${this.route}`, name });
  },
};

tahmeed.book('Alphax');
console.log(tahmeed);

// Suppose we would want to call the book method on another object
// That's where the this keyword called manually comes in handy.

const miniTahmeed = {
  bus: 'Scania',
  route: 'Nairobi - Dar',
  bookings: [],
};

const book = tahmeed.book;

// This is how you would call it
book.call(miniTahmeed, 'Sarah');

console.log(miniTahmeed);

// The bind method
const bookTahmeed = book.bind(tahmeed);
const bookminiTahmeed = book.bind(miniTahmeed);

bookTahmeed('Nana');
bookminiTahmeed('Joe');

console.log(tahmeed);

// bind method with event listeners

tahmeed.busesNum = 300;

tahmeed.buyBus = function () {
  this.busesNum++;
};

document
  .querySelector('.buy')
  .addEventListener('click', tahmeed.buyBus.bind(tahmeed));

// Partial application (pre-setting parameters values using bind)

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Starting with null in presetting is kind of a standard
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// CODING CHALLENGE

/*

// My approach ... I have defined methods outside the poll object
const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),

}

const registerNewAnswer = function(){

    let message = poll.question + '\n';
    let answers = poll.answers;
    const options = poll.options;
    for (let i=0; i<options.length; i++){
        message += options[i] + '\n';
    }

    message += '(Write option number)'
    const userInput = Number(prompt(message));

    // if (userInput >= 0 && userInput <= 3){

    //     answers[userInput]++;

    //     console.log('Polls:', answers)
    // }

    
        SHORT-CIRCUITING: This is a useful technique that arises whenever we have
        multiple conditions to check before evaluating to a final answer, If you
        have only two conditions, then a ternary operator would be an ideal solution

        On this account i comment the if statement above and replace it with the follo
        wing line of code which will do the same work but more efficient

    

    userInput >= 0 && userInput <= options.length && answers[userInput]++;
    console.log('Polls:', answers);

    displayResults();
    displayResults('string');
    //hello();
    
}



//const hello = () => console.log('Results Results Results!!!');
const displayString = () => console.log(`Poll results are ${[...(poll.answers)]}`);
const displayArray = () => console.log('Poll results are', poll.answers);

const displayResults = function(type = 'array') {
    type === 'string' ? displayString() : displayArray(); 
}

document
    .querySelector('.poll')
    .addEventListener('click', registerNewAnswer);

// End of my approach

*/

// Tutors approach... Defining methods inside the object and using the 'this' keyword

const poll2 = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answerIndex = Number(
      prompt(`${this.question}\n${this.options.join('\n')}\n 
        Write option number`)
    );

    typeof answerIndex === 'number' &&
      answerIndex <= this.options.length &&
      this.answers[answerIndex]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are ${[...this.answers]}`);
    } else {
      console.log('Poll results in array:', this.answers);
    }
  },
};

// poll2.registerNewAnswer();
document
  .querySelector('.poll')
  .addEventListener('click', poll2.registerNewAnswer.bind(poll2));

// Use the following data to invoke the displayResults function
// NOTE: The data is outside the poll2 object, so here we need to
// manuever so that the method keeps using this keyword but pointing
// to the different object.

// Test Data [5, 2, 3] and [1, 5, 3, 9, 6, 1]

poll2.displayResults.call({ answers: [5, 2, 3] });
poll2.displayResults.call({ answers: [5, 2, 3] }, 'string');

/* 
    IMMIDIATELY EXECUTED FUNCTIONS: Functions that only run once.

    The concept is used in Async await functions
*/

// Immidiately Invoked Function Expression (IIFE)

(function () {
  console.log('This function will never run again!');
})();

(() => console.log('This function will never run again!'))();

/*
    CLOSURES: A function has access to all the variables created at its birthplace
*/

// Example 1
function secureBooking() {
  let passengersCount = 0;

  return function () {
    passengersCount++;
    console.log(`${passengersCount} passengers`);
  };
}

const booker = secureBooking();

booker();
booker();
booker();

// Viewing a closure
console.dir(booker);

// Under normal circumstances booker() shouldn't have access to passengersCount variable
// But closures make it possible

// Example 2
let f;

const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 11;

  f = function () {
    console.log(b * 2);
  };
};

// You must call g() first before f()
g();
f();
console.dir(f);

h();
f();
console.dir(f);

// Example 3

const boardPassengers = function (n, wait) {
  const passengersPerGroup = n / 3;

  // This function will execute after specified time
  setTimeout(function () {
    console.log(`We are boarding all ${n} passengers`);
    console.log(
      `There are three groups, each with ${passengersPerGroup} passengers`
    );
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// The function inside boardPassengers is executing in the global scope,
// So if not for a closure, the below defined variable would be in favor
// to execute, but since closures have priority over the scope chain, the
// variable defined inside the boardPassengers function will be in execut
// ion

const passengersPerGroup = 16;
boardPassengers(120, 4);

// CODING CHALLENGE

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

// The concept for further review --> The bind()
