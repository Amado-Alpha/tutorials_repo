'use strick';

/* 
   This style of writing functions is called function expressions.
   It's a nice way of writing functions as it will help you call the 
   function only after defining it 
*/

const age1 = function calculateAge(birthYear) {
    return 2037 - birthYear;
}
console.log('Normal function:', age1(2015))


// Arrow function

const age2 = birthYear => 2037 - birthYear;
console.log('Arrow function:', age2(2011))

// Multiple arguments arrow functions

const yearsUntilRetirement = (birthYear, firstName) => {
    const yearsToRetirement = 60 - (2037 - birthYear);
    return `Hey ${firstName}, You have ${yearsToRetirement} years till retirement.`
}
console.log(yearsUntilRetirement(2000, 'John'))



// Coding challenge.

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;


const avgDolphins = calcAverage(44, 23, 71);
const avgKoalas = calcAverage(65, 54, 49);

const checkWinner = function (avgDolhinsScore, avgKoalasScore) {
    const dolphinsWon = avgDolhinsScore >= 2 * avgKoalasScore;
    const koalasWon = avgKoalasScore >= 2 * avgDolhinsScore;

    if (dolphinsWon) {
        console.log(`Dolphins win ( ${avgDolhinsScore} vs. ${avgKoalasScore})`)

    } else if (koalasWon) {
        console.log(`Koalas win ( ${avgKoalasScore} vs. ${avgDolhinsScore})`)
    } else {
        console.log('No one wins.');
    }
}

checkWinner(avgDolphins, avgKoalas);

// Objects

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    // calcAge: function (birthYeah) {
    //     return 2037 - birthYeah;
    // }

    // calcAge: function () {
    //     // console.log(this);
    //     return 2037 - this.birthYeah;
    // }

    calcAge: function () {
        this.age = 2037 - this.birthYeah;
        return this.age;
    },
}

console.log('Calling a function within object:', jonas.calcAge())

// Coding challenge

const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}

john.calcBMI();
mark.calcBMI();

// You need to call the above methods before proceeding,
// They cannot call themselves

if (john.bmi > mark.bmi) {
    console.log(`${john.fullName}'s BMI (${john.bmi}) is greater
    than ${mark.fullName}'s BMI (${mark.bmi})`)
} else if (mark.bmi > john.bmi) {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is greater
    than ${john.fullName}'s BMI (${john.bmi})`)
}

arrayTest = [11, 10, 4, 8, 5, 2]
let max = arrayTest[0];

for (let i = 0; i < arrayTest.length; i++) {

    if (arrayTest[i] > max) {
        max = arrayTest[i]
    }
}
console.log('max:', max);


// CODING CHALLENGE
printForecast = function (temperatureArray) {
    let stringToLog = ``;
    for (let i = 0; i < temperatureArray.length; i++) {

        stringToLog += `...${temperatureArray[i]}K in ${1 + i} days`
    }

    console.log(stringToLog + '...');
}

printForecast([17, 21, 23])