'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
/*
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Function to display movements as per defined data object at the top of this file

const displayMovements = function(movements){

  // Initializing the container to emptiness
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i){

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = 
    `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+0} ${type}</div>
        <div class="movements__value">${mov = type === 'withdrawal' ?  mov: mov}€</div>
      </div>
    `;

    // 'afterbegin makes sure the content is arranged in descending order
    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
};

//displayMovements(account1.movements);

// Calculate and diplay balance

const calcDisplayBalance = function(accnts){

  accnts.balance = accnts.movements.reduce((movAccumulator, curMovement) => 
    movAccumulator + curMovement, 0);
  labelBalance.textContent = `${accnts.balance}€`;
};

// calcDisplayBalance(account1.movements);

// Calculating and displaying summary of deposits

const calcDisplaySummary = function(accnts){

  const incomes = accnts.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outgoing = accnts.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  // The methods where there is return keyword and 
  // console.logs are there purposely for debugging
  // just in case you run into a problem with these
  // chained methods
  const interest = accnts.movements
    .filter((mov, i, arr) => mov > 0)
    .map((deposit, i, arr) => {
      //console.log('interest > 0:', arr)
      //console.log('Interest rate:', accnts.interestRate)
      return accnts.interestRate/100 * deposit
    })
    .filter((int, i, arr) => {
      //console.log('interests:', arr)
      return int >= 1})
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}€`;
};

//calcDisplaySummary(account1);
// calcDisplaySummary(account1.movements);

// Creating usernamen(should give only initials in lower case)

const createUserName = function(accs){
  
  // We are using for each bcuz we don't want to mutate the original array
  accs.forEach(function(acc){

    // acc.username adds a new entry username to our accounts objects
    acc.username = acc.owner 
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  });
  
    //Another way for the map instead of arrow function
    // map(function(name){return name[0]}
};

createUserName(accounts);
//console.log(accounts);

// Updating the UI
const updateUI = function(acc){
  // Display movements
  displayMovements(acc.movements);
    
  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}

// Implementing login

let currentAccount; // defined this globally bcuz other functions are gonna need it

btnLogin.addEventListener('click', function(e){
  
  e.preventDefault(); // prevent default behaviour of form submission after button click
  
  currentAccount = accounts.find(accnt => accnt.username === inputLoginUsername.value);

  // Below line of code is how i should implement to check if the account actually exists
  // But at the time of writing this i am using an old opera browser that doesn't support
  // new features of js
  // if(currentAccount?.pin === Number(inputLoginPin.value)){
  if(currentAccount.pin === Number(inputLoginPin.value)){

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    // Channge opacity value to hundred, to make details visible
    // Because the login logic is that opacity is 0 when not logged in
    // and opacity to 100 when logged in so that details are visible

    containerApp.style.opacity = 100; // Ts a good practice to use classes for tasks as these

    // Update the UI with respective data
    updateUI(currentAccount);
  }
});


// Transfer amount

btnTransfer.addEventListener('click', function(e){
  
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  //console.log(amount, receiverAcc);

  inputTransferTo.value = inputTransferAmount.value = '';

  if (
     amount > 0 && 
     currentAccount.balance >= amount && 
     receiverAcc && // on the following line you can just add eceiverAcc?.username for newer browsers
     receiverAcc.username !== currentAccount.username ){
    
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
 
     //console.log('Transfer valid');
    }
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => 
    mov >= amount * 0.1)){
    // Add the amount to movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
})


// Closing/Deleting the account

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  //console.log('Close account')
  if (
      currentAccount.username === inputCloseUsername.value  &&
      currentAccount.pin === Number(inputClosePin.value) 
  ){

    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    
  }

  // Clearing the input fields
  inputClosePin.value = inputCloseUsername.value = '';
})
*/

/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ARRAY METHODS 

let arr = ['a', 'b', 'c', 'd', 'e'];

// Get everything from specified starting position except last two elements

console.log(arr.slice(1, -2));

// slice() doesn't change the original array, but splice() mutates the original array
// splice() takes part of the array and leaves the original array short of the spliced
// elements

// Go to position 1 and delete two elements
console.log('Spliced at position 1 then 2 elements:', arr.splice(1, 2)); 
console.log(arr); // output = ['a', 'd', 'e']
arr.splice(2);
console.log(arr); // output = ['a', 'b']

// arr.concat(arr2);
// arr.join('-');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements){
  if(movement > 0){
    console.log(`You deposited ${movement}`)
  } else{
    console.log(`You withdrew ${Math.abs(movement)}`)
  }
};

// If we wanted to access the index in he for of loop 
// We could just write for (const[i, movement] of movements.entries())

// Now achieving the same using forEach loop
console.log('-----Using forEach-----')

// movements.forEach(function(movement){
//   if(movement > 0){
//     console.log(`You deposited ${movement}`)
//   } else{
//     console.log(`You withdrew ${Math.abs(movement)}`)
//   }
// });

// Now if we wanted access to the index in the forEach loop
// The order at which the arguments are passed really matters
// Because that's how they are passed, arr is actually an enti
// re array 

// NB: You cannot use break or continue statement in the forEach loop

movements.forEach(function(movement, index, arr){
  if(movement > 0){
    console.log(`${index}: You deposited ${movement}`)
  } else{
    console.log(`${index}: You withdrew ${Math.abs(movement)}`)
  }
});

// forEach exists also in maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});

// forEach on sets
const currenciesUnique = new Set(['EUR', 'GBP', 'YEN', 'EUR', 'USD']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, key, set){
  console.log(`${key} : ${value}`);
}); // As the results are seen to the console key = value, that's because sets donot have indexes

// It would make sense to just write it as follows
// An underscore is a throw-away variable which means is of no significance

console.log(`===Sets' forEch rewritten===`)
currenciesUnique.forEach(function(value, _, set){
  console.log(`${value} : ${value}`);
});



// CODING CHALLENGE   

const julieDogs = [3, 5, 2, 12, 7];
const katieDogs = [4, 1, 15, 8, 3];

const checkDogs = function (dogsOfJulie, dogsOfKatie){

  const copyOfdogsOfJulie = dogsOfJulie.slice();
  copyOfdogsOfJulie.splice(0,1);
  copyOfdogsOfJulie.splice(-2);
  console.log(copyOfdogsOfJulie);

  const katieAndJulieDogs = [...copyOfdogsOfJulie, ...katieDogs];
  console.log(katieAndJulieDogs);

  katieAndJulieDogs.forEach(function(dogAge, index){
    
    if (dogAge >= 5){
      console.log(`Dog number ${index+1} is an adult, and is ${dogAge} years old.`)
    }else{
      console.log(`Dog number ${index+1} is still a puppy.`)
    };
  });
};

checkDogs(julieDogs, katieDogs);

// DATA TRANSFORMATIONS USING MAP, FILTER AND REDUCE

// The Map() iterates over an array and produces a new array due to a specified
// operation on the original array (Useful more that forEach)

// The filter() produces a new array from the original array for only the el
// ments that meet a certain defined condition

// The reduce() boils down the values of an array down to a single value, an exa
// mple to this is adding up all array elements together


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Convert them to USD with a conversion rate of 1.1 using map()
const eurToUSD = 1.1;
// const convertedToUSD = movements.map(function(mov){
//   return mov * eurToUSD;
// })

// Converting the above function to an arrow function

const convertedToUSD = movements.map(mov => mov * eurToUSD);

console.log('Original array', movements);
console.log('Converted to USD:', convertedToUSD);

// map method to access the index

const movementDescriptions = movements.map(
  (mov, index, arr) => 
    `Movement : ${index+1} You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);

console.log(movementDescriptions);

// filter()

const deposits = movements.filter(function(mov){
  return mov > 0;
})

console.log(deposits);


// reduce()

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const sumOfMovements = movements.reduce(function(acc, cur, i, arr){

  console.log(`Iteration number: ${i+1} Accumulator value is: ${acc}`);
  return acc + cur
}, 0) // 0 is the initial value of the accumulator(acc in this case, can be any variable name)

console.log(sumOfMovements);

// Finding max value with reduce()
const maxValue = movements.reduce((acc, cur) =>
  cur > acc ? cur : acc
, movements[0]);

console.log('maximum value:', maxValue);

// LOGIC BEHIND
// If cur > acc, in the next iteration, the cur becomes the new acc
// const max = movements.reduce((acc, cur) => {
//   if (acc > cur)
//     return acc;
//   else
//     return cur;
// }, 0)

// console.log(max)



// let maxN = movements[0];
// const mymax = function(){
//   for (const mov of movements){
//     if (maxN > mov)
//       maxN = mov;
//   return max
      
//   }
// }
//console.log('mymax:',mymax())


// CODING CHALLENGE 

const data1 = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = function(dogAges) {
  
  // Methods used here are all that transform the original array
  // const humanAges = dogAges.map(function(dogAge)  {
  //   return dogAge < 2 ? dogAge * 2 : (16 + dogAge) * 2
  // });

  const humanAges = dogAges.map(dogAge =>  
     dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
  );
  //console.log('Human ages', humanAges);
  const adults = humanAges.filter(adult => adult >= 18);
  //console.log('Adults:', adults);
  const averageAge = adults.reduce((acc, adult) => (acc + adult), 0) / adults.length;

  // Another way of calculating average
  // Eg. avg of 2 and 3 can be 2+3/2 or 2/2+3/2
  // So in this case our average can also be calculated as below

  //const averageAge = adults.reduce((acc, adult, i, arr) => (acc + adult)/arr.length, 0);

  console.log(`Average human age is ${averageAge}`);
  console.log('Original array:', dogAges);
}

calcAverageHumanAge(data1);

// CHAINING ARRAY TRANSFORMING METHODS

const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;

const totalDepositsInUSD = movements1
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD )
  .reduce((acc, mov) => acc + mov, 0);

console.log(`Total deposits in USD: ${totalDepositsInUSD}`);


// CODING CHALLENGE

const data2 = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge2 = function(dogAges) {
  
  const averageAge = dogAges
    .map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4)
    .filter(adult => adult >= 18)
    .reduce((acc, adult, i, arr) => (acc + adult)/arr.length, 0);

  console.log(`Average human age is now ${averageAge}`);
}

calcAverageHumanAge2(data2);

// find method --> returns the first element that meets a given condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(`First withdrawal ${firstWithdrawal}`);

const account = accounts.find(accnt => accnt.owner === 'Jessica Davis');
console.log(account)

// Challenge ---> Re-writting the above account code using for of loop

for (const accnt of accounts) {
  if (accnt.owner === 'Jessica Davis') {
    console.log('Jessicas account from "for of" loop:',accnt)
    //console.log(`Jessicas account from "for of" loop: ${accnt}`);
  };
};

// More array methods
// includes() --> Checks for equality i.e(If there is a value that is equal to the specified value)

movements.includes(-130); // Returns true if such value exists

// Quite similar to includes() but the main difference here is that you can specify a condition
// returns true if any of the elements meets the defined condition
movements.some(mov => mov > 0); 

// every() --> returns true if all of the elements of an array satisfy the specified condition

movements.every(mov => mov > 0) 

// COOL STUFF, You can decide to write a variable that holds the function definition and then 
// pass it to the function

deposit = mov => mov > 0;

movements.filter(deposit);
movements.every(deposit);
movements.some(deposit);




// flat() and flatMap

const arr = [[1,2], 9, 3, 1, [0, 3]];

// flat() gets rid of nested array but preserves its elements together with others in one array
// console.log(arr.flat());

// const DeepArr = [[[1,2]], 9, 3, 1, [0, 3]];
// console.log(DeepArr.flat());
// console.log(DeepArr.flat(2)); // That 2 specifies the depth level you wanna go


// Calculating the overall balance of the movements of the accounts

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

// Collecting them in one array
const allMovements = accountMovements.flat();
console.log(allMovements);

// Adding them  all

const total = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(total);

// finally you can do it by chaining
const totalByChain =  accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalByChain);

// flatMap() --> mapping and then flattening up was noticed to a very common operation
// So a method flatMap() that houses all the two methods was introduced, NOTE: its dow
// nside is that it goes just 1 level deep

const totalByChain2 =  accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalByChain2);


// MORE ARRAY METHODS PRACTICES

// Counting deposits atleat greater than 1000

const deposit1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(deposit => deposit >= 1000).length;

console.log(deposit1000);

const deposit1000reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => cur >= 1000 ? ++count : count, 0);
// ++variable increments the variable and return the incremented value
// variable++ returns the original value and then increments the variable
console.log(deposit1000reduce);


// Example
let x = 2;
let y = 3;
console.log(x++); // returns 2 and then when you call x below, it will evaluate to 3
console.log(x);
console.log(++y); // Returns 4 straight away
console.log(y);


// Creating an object with reduce method
// NOTE: reduce() is very powerful of all the array methods
// Creating a brand new object using the reduce method

// You can also destructure it
// const {deposits, withdrawals}

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    //cur > 0 ? sums.deposits += cur : sum.withdrawals += cur

    // Cleaner way than above 
    sums[cur > 0 ? 'deposits': 'withdrawals'] += cur;

    // In arrow function a value is returned automatically if there's no curly braces
    // If you have curly braces you have to define the return in your code as below
    return sums;
  }, {deposits: 0, withdrawals: 0});

console.log(sums);

// TitleCase --> capitalize first letter of the word but leave the exceptions
// eg. this is a nice title --> This Is a Nice Title ( a is an exception)

const convertTitleCase = function(title){

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'but', 'and', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => exceptions.includes(word) ? word : capitalize(word))
    .join(' ');

  // We are returning capitalize(titleCase) in the end because there
  // might be scenarios where the first word is in the exceptions and
  // a sentence would have to start with the a lower case letter and we
  // we don't want that
  return capitalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('and this is a nice title'));

*/

// CODING CHALLENGE 

// Studying whether dogs eat too much or too little

// Eating too much == Dog's current food portion > recommended portion

// Eating too much == opposite of eating too much

// Eating an okay amount == Dog's current portion is within the range 10% below
// and above the recommended portion

const dogs = [
  {weight: 22, curFood: 250, owners:['Alice', 'Bob']},
  {weight: 8, curFood: 200, owners:['Matilda']},
  {weight: 13, curFood: 275, owners:['Sarah', 'John']},
  {weight: 32, curFood: 240, owners:['Michael']},
];


// 1 -- Calculate recommended food portion for each dog
// formula : weight ** 0.75 * 28

// dogs[0].recommended = 12;
//console.log(dogs[0].weight);

dogs.forEach((dog, i) => {
  //console.log(dog.weight)
  dog.recFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);


// 2 --> Sarah's dog eating habit

const eatingHabit = function(dog){
  // dog.curFood > dog.recommendedFood ? console.log(`Sarah's dog eats too much`) 
  //   : console.log(`Sarah's dog eats too little`);
  
  // Better way below (There's replication of the words 'Sarah's dog eats too' )
  // That violates the DRY principle
  console.log(`Sarah's dog eats too ${dog.curFood > dog.recFood ? 'much' : 'little' }`)
}

dogs.map(dog=> {
  if(dog.owners.includes('Sarah')){
    eatingHabit(dog);
  }
});

// Alternative 
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(
  `ALTERNATIVE SOLUTION: Sarah's dog eats too ${dogSarah.curFood > dogSarah.recFood ? 
    'much' : 'little' }`
)


// 3

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

const dogOwners = function(owners, arrCombinedOwners){
  owners.forEach(owner => arrCombinedOwners.push(owner));
}

dogs.map(dog => 
  dog.curFood > dog.recFood ? 
  dogOwners(dog.owners, ownersEatTooMuch) 
  : dogOwners(dog.owners, ownersEatTooLittle)
);

console.log('Lazy eaters:', ownersEatTooLittle);
console.log('Owners of the greedy:', ownersEatTooMuch);

// Alternative

const ownersEatTooMuch1 = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .map(dog => dog.owners)
  .flat();

console.log('ALTERNATIVE: Dog OwnersEatTooMuch', ownersEatTooMuch1);


// 4 
console.log(`${ownersEatTooMuch.join('and')}'s eat too much`);
console.log(`${ownersEatTooLittle.join('and')}'s eat too little`);

// 5
console.log(dogs.some(dog => dog.curFood > dog.recFood));

// 6
const checkEatingOkay = dog => 
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(
  dogs.some(
    checkEatingOkay 
  )
)

// 7
console.log((dogs.filter(checkEatingOkay)));

// 8
const dogSortedAscending = dogs.slice().sort((a, b) => 
    a.recFood - b.recFood
);

console.log(dogSortedAscending);