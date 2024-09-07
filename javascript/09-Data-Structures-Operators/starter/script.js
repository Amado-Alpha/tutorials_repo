'use strict';

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//console.log(flights.split('+'));
// Very important : Every split function produces an array.
const getCode = str => str.slice(0, 3).toUpperCase();
for (const flight of flights.split('+')) {
  //console.log(flight.split(';'));
  // console.log(flight);
  const [type, from, to, time] = flight.split(';');
  // console.log(type, from, to , time)
  const output = `${type.startsWith('_Delayed') ? '☹' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(46);
  console.log(output);
}
// // Data needed for first part of the section
// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   [weekdays[5]]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   // openingHours: {
//   //   thu: {
//   //     open: 12,
//   //     close: 22,
//   //   },
//   //   fri: {
//   //     open: 11,
//   //     close: 23,
//   //   },
//   //   sat: {
//   //     open: 0, // Open 24 hours
//   //     close: 24,
//   //   },
//   // },

//   openingHours,
// };

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Playing with the game object.

console.log('=========Playing with game object===========');

// Access the date object
// const dateValue = game.date;
// console.log(`The date of the game is ${dateValue}`)

// From players lists, Return an array consisting only of defenders.
//console.log(game.players[1])

// const playerEntries = Object.entries(game.players[1]);

const accessPlayerValues = Object.values(game.players[0]);

// for (const player of accessPlayerValues) console.log(`Each player accessed as a value
// ${player}`);

console.log(`Accessing game.players[values] ${accessPlayerValues}`);

// const teamDefenders = function(arrayOfObjectEntries){

//   let defenders = [];
//   const defenderPositions = [2, 3, 4, 5];
//   for (const [positionNumber, player] of playerEntries){
//     //console.log(positionNumber, player, typeof(positionNumber));
//     const playerPosition = Number(positionNumber) + 1;

//     if (defenderPositions.includes(playerPosition)){
//       defenders.push(player);
//     }
//   }
//   console.log('Team defenders are:', defenders)
// }
// teamDefenders(playerEntries)

// CODING CHALLENGE 1

// Qn1. Create one player array for each team(with variables players1 and players2)

// const players1 = [...game.players[0]]
// console.log('Bayern Munich:', players1)

// const players2 = [...game.players[0]]
// console.log('BVB:', players1)

// Qn2.

// const [gk, ...fieldPlayers] = players1;
// console.log('Bayern Goalkeeper:', gk);
// console.log('Field players:', fieldPlayers);

// Qn3.

// const allPlayers = [...players1, ...players2];
// console.log('All players:', allPlayers)

// Qn4.

// const subs = ['Thiago', 'Coutinho', 'Perisic'];
// const playersFinal = [...players1, ...subs];
// console.log('All used players:', playersFinal);

// Qn5.

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log('Odds:', team1, draw, team2);

// Testing the above concept more!
const { team1: myFavTeam } = game;
console.log('My Fav Team:', myFavTeam);

// Qn6.

// const printGoals = function(...goalScorers){

//   console.log('Goals scored by:', goalScorers)
//   console.log(`Won by ${goalScorers.length} goals`)
// }

// printGoals('Muller', 'Lewandowski', 'Gnabry', 'Goretzka');
// // The result is an array of given players as arguments

// Qn7.

// team1 < team2 && console.log('Team 1 is more likely to win');
// team1 > team2 && console.log('Team 2 is more likely to win');

// ======= END OF CODING CHALLENGE 2 ========

// LOOPING OVER OBJECTS

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },

  openingHours, //this is how you would include an opening hours property if it was defined outside
};

const properties = Object.keys(openingHours);
console.log('Properties/Keys:', properties);

// Accessing the openingHours object within the restaurant object
// Returning the entire object
const entries1 = Object.entries(restaurant.openingHours);
console.log('Entries:', entries1);

const keys = Object.keys(openingHours);
console.log('Keys:', keys);

const values = Object.values(openingHours);
console.log('Values:', values);

// [key, value]
for (const [day, { open, close }] of entries1) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// CODING CHALLENGE 2

// Qn1.

// Returning the entire object
// This is useful if you want to see how the data looks like in the console
// const entries = Object.entries(game.scored);
// console.log('Entries by Object method:', entries)

// You can also get the same entries by using the method below.
// This is useful if you want to iterate over the data. Looking at the console
// you won't get a good presentation of data compared to above option. See the
// Console for yourself
const entriesMethod2 = game.scored.entries();
//console.log('entries by another method:', entriesMethod2);

//for (const [i, player] of entriesMethod2)
//console.log(`Goal ${i + 1}: ${player}`);

// Qn2.

const odds = Object.values(game.odds);
console.log(odds);

const calcAverageOdds = function (odds) {
  let average = 0;
  for (const odd of odds) average += odd;
  console.log(`Average of odds is: ${(average /= odds.length)}`);
};

calcAverageOdds(odds);

// Alternative: I could have used entries(Entire Odds object and still arrive
// at the same solution, check below)

const oddsEntries = Object.entries(game.odds);
const oddsValuesFromEntries = [];
for (const [, oddsValue] of oddsEntries) {
  //console.log('Odds value from Entire Odds Object:', oddsValue)
  oddsValuesFromEntries.push(oddsValue);
}

console.log(oddsValuesFromEntries);
//console.log('Odds Entries:', oddsEntries[0])

//Now call the calcAverageOdd function
calcAverageOdds(oddsValuesFromEntries);

// Qn3.

// console.log(Object.entries(game.odds))

// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }

// Bonus Qn.
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

// ======= END OF CODING CHALLENGE 2 ========

// CODING CHALLENGE 03

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// Qn.1

const events = gameEvents.values();
console.log('Unique events:', ...new Set(events));

// Qn.2

gameEvents.delete(64);
console.log(gameEvents);

// Qn.3

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
const time = [...gameEvents.keys()].pop();
console.log('Time of the game:', time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// Qn.4

for (const [min, event] of gameEvents) {
  const half = min > 45 ? 'SECOND HALF' : 'FIRST HALF';
  console.log(`${half} : ${event}`);
}

// ======= END OF CODING CHALLENGE 03 ========

// STRINGS

// TIPS

/*
  str.indexOf()
  str.lastIndexOf() --> returns the index of the specified last occurence of a specif
                        ied parameter
  str.slice(3, 8)
  NB: The length of a string = ending value - beginning value i.e 8-5

  str.upperCase();
  str.lowerCase();
  str.trim(); gets rid blankspaces
  str.replace(arg1, arg2);

  NB: All methods applied on strings return a new string, they don't mutate it

  Boolean returning methods
  str.includes(arg);
  str.startsWith(arg);
  str.endsWith(arg);

  NB: For comparison cases, you should always start by converting a string to 
  lowercase before proceeding with the comparisons.

  str.split();
  str.join();

  String padding
  It's all about adding characters to a string until it reaches our desired sp
  ecified size
  str.padStart(size, character)

  str.repeat(numberofTimes)

  
*/

const airline = 'TAP Air Portugal';

// Return the first word
console.log(airline.slice(0, airline.indexOf(' ')));

// Return the last word

console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// Replacing

const announcement =
  'All passengers come to boarding door 23, Boarding door 23';

console.log(announcement.replaceAll('door', 'gate'));

// Padding

const message = 'Hey there';

console.log('Padding:', message.padStart(40, '+').padEnd(60, '+').length);
console.log(message.padEnd(20, '+'));

// A real world use case of padding

const maskCreditCard = function (number) {
  const convertedToString = number + '';
  const lastFour = convertedToString.slice(-4);
  const maskedNumber = lastFour.padStart(convertedToString.length, '*');
  return maskedNumber;
};
console.log(maskCreditCard(2333389988));

// CODING CHALLENG O4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const toCamelCase = function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  //console.log('Row entries:', rows.entries());
  //let count = 0;
  for (const [count, row] of rows.entries()) {
    const [firstWord, secondWord] = row.toLowerCase().trim().split('_');
    const convertedSecondWord =
      secondWord[0].toUpperCase() + secondWord.slice(1);
    const finalWord = firstWord + convertedSecondWord;
    console.log(`${finalWord.padEnd(20)}${'💹'.repeat(count + 1)}`);
  }
};

document.querySelector('button').addEventListener('click', toCamelCase);

// Mtabe's approach

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const rows = text.split('\n');

//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split('_');

//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
//   }
// });

const myarr = [
  'underscore_case',
  ' first_name',
  'Some_Variable ',
  '  calculate_AGE',
  'delayed_departure',
];

console.log(myarr.entries());

for (const [index, value] of myarr.entries()) console.log(index, value);

///////////////////////////////////////
// Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

///////////////////////////////////////
// Maps: Fundamentals
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

// const time = 8;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));

///////////////////////////////////////
// Sets
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschmedtmann').size);

///////////////////////////////////////
// Optional Chaining
if (restaurant.openingHours && restaurant.openingHours.thu)
  console.log(restaurant.openingHours.thu.open);

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.thu?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  //console.log(open);
  console.log(
    `On ${day}, ${open === 'closed' ? 'we are' : 'we open at'} ${open}`
  );
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];

console.log(users[0]?.name ?? 'User array empty');

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');
