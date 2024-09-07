'use strict';

function calcAge(birthYear){
    const age = 2037 - birthYear;
    console.log(firtsName);
    return age;
}

const firtsName = 'Lodie';
calcAge(2012);




// Primitives vs. Objects in Practice

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage: ', marriedJessica);
// marriedJessica = {};

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);

/*
    Object.assign() will only provide the a complete independent copy that will
    not only change the first level contents of the object. 

    Forexample: jessicaCopy.lastName = 'Davis'; will only mutate the lastName in 
    jessicaCopy object but leave the original object jessica2 with original name
    Williams. 

    But altering an array in the copy (jessicaCopy) will have effect on both the
    copy and and original (jessica2). To counter that there's specific libraries
    like Lo-dash etc. that can help you achive that.
    like Lo-dash etc. that can help you achive that.
*/

