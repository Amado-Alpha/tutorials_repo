'use strict';

///////////////////////////////////////

// Constructor Functions and the new Operator
/**
 * The only difference between a constructor function
 * and a regular function is that we call the constru
 * ctor function with 👉"new" keyword.
 *
 * NB: Starting with a capital letter is a commonly used
 * convection. not a law, but it's wise 😊 to stick to it.
 *
 * An arrow function cannot serve this purpose b'coz it do
 * esn't have its own "this" keyword.
 */
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this! 😡
  /**
   * Creating methods inside a constructor function
   * is a bad practice. Imagine if you had to create
   * a 1000 objects. All of them would be carrying a
   * round a copy of this function which is pretty b
   * ad for performance.
   *
   * SOLUTION to this is prototypes and prototypal
   * inheritance.
   */

  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(jonas instanceof Person);

/**
 * This is equivalent to creating a static method.
 * Other objects (or instances) can't access it, b'coz its not
 * added in the prototype property.
 * Forexample: Consider an example below where i call it
 * using the "jack" object above.
 */
Person.hey = function () {
  console.log('Hey there 👋');

  /**
   * Whatever object is calling the method,
   * will be the "this" keyword in that func
   * tion.
   */
  console.log(this);
};
Person.hey();
// jack.hey(); this would trigger an error

///////////////////////////////////////
// Prototypes
/**
 * Each function in JS automatically has a property called prototype.
 *
 * Every object created throgh a contructor function will have access
 * to all the methods of that constructor function's prototype property
 */

console.log(Person.prototype);

/**
 * Attention 🔥
 * Remember when we said in section above that we shouldn't create
 * method in the constructor function? We said that would produce a copy
 * of that method for each object created, hence causing performance is
 * sues. But with prototypal inheritance you can create just one copy and
 * billions of objects created can have access to it. Below is how it's
 * done.
 */
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

// Object prototype
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas)); // Output: true
console.log(Person.prototype.isPrototypeOf(matilda)); // Output: true
console.log(Person.prototype.isPrototypeOf(Person)); // Output: false

// .prototyeOfLinkedObjects

// You can add properties too.
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
/**
 * By moving up the prototype chain, you get to see the methods and obje
 * ct has got access to, which in turn you can use in your object as you
 * wish.
 * eg. console.log(jonas.hasOwnProperty('firstName'));
 *     The hasOwnProperty() method there, is found two steps up the pro
 *     totype chain. There's a list of other methods as well.
 */

// Moving up the chain (2 - steps).
console.log(jonas.__proto__.__proto__);

// 3 - steps. (The end of chain, you can't move further up in this case)
console.log(jonas.__proto__.__proto__.__proto__); // Output: null.

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// Adding a new method to the built-in object Array prototype.
/**
 *  Adding methods to a built-in object is not a good idea.
 *  You can be at a potential risk of conflicts.
 *  Forexample, the unique() we added below, suppose the next
 *  version of javascript adds a method with similar name but
 *  behaves a bit differently, that would break your code.
 *
 *  2ndly, If you're working in a team of developers and every
 *  body else decides to add the same method but with a differe
 *  nt name 🤣, That would be turn into a mess.
 */
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// RECAP: All DOM elements are just objects behind the scenes.
/**
 * So they have prototypes and hence prototype chain.
 */
const h1 = document.querySelector('h1');
console.dir(h1);

// Function itself is an object so it has a prototype.
/**
 * This is why we can call methods on functions.
 */
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

///////////////////////////////////////
// ES6 Classes
/**
 * Attention 🔥
 * Classes in javascript use prototypal inheritance behind
 * the scenes. ES6 classes have been introduced in order to
 * make JS OOP make sense to programmers coming from other
 * programming langeuges. Under the hood JS classes don't work
 * the same as classes of other languages like java or C++.
 */

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //
  //
  /**
   * Whenever setting a property that already exists, use an
   * underscore eg. _fullName. Again it's not a rule but a widely
   * adopted convention. NB. however doing so actually creates
   * a new variable. eg. _fullName will a new variable now.
   */
  // Setters can be useful for validation.
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  /**
   * Static method (Not added in the prototype property)
   * Other instances can't have access to it.
   */
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);

//Calling a static function, this would trigger an error
//jessica.hey();
//console.log(jessica);

// This is how you would call a static method
PersonCl.hey();

/**
 * An example of this kind of concept is Array.from()
 * You can't access this method with array instances
 */

jessica.calcAge();
// accessing a getter as a property
console.log(jessica.age);

// The same concept of prototype chain holds true
console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

/* Some FACTS🖐🖐👇 about Classes */
// 1. Classes are NOT hoisted (i.e Can't use them b4 they're declared)
// 2. Classes are first-class citizens
/**
 * Can pass them into functions and return them from functions.
 * This is because classes are just a special kind of functions behind
 * the scenes.
 */
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);
// PersonCl.hey();

///////////////////////////////////////
// Setters and Getters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  // Each setter needs to exactly one parameter.
  set latest(mov) {
    this.movements.push(mov);
  },
};

// Calling just as a property
console.log(account.latest);

account.latest = 50;
console.log(account.movements);

/**
 * Just like as shown in the object above, classes too have
 * getters and setters. Go one example back to this.
 */

///////////////////////////////////////
// Object.create
/**
 * This is a third way of prototypal inheritence
 * after getting to know about classes, and const
 * ructor function.
 *
 * Attention🔥
 * The "new" keyword in the function constructor
 * was how we created the our instances eg. const car = new Car();
 * But in object.create the process is a bit straight forward and
 * makes it a more natural approach.
 * However it's the least used in the real world.
 */
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  /**
   * NB: This has nothing to do with the
   * constructor functions we discussed
   * earlier as there is no "new" keyword.
   */
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

/**
 * Attention 🔥
 * So the difference here is how the instance gets access
 * to the methods and properties from the object by which
 * it's created.
 *
 * For Object.create(instance), the instance gets access
 * to the object itself, while with constructor function
 * an instance gets access through the prototype property
 * of the constructor.
 *
 * To put it into perspective, For constructor function
 * and classes, we need a mediator(protoype property), while
 * in Object.create there's no need.
 */

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
*/

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

/**
 * QUICK RECAP:✍🏽✍🏽✍🏽
 * Below is how we declare methods to constructor functions
 * to avoid instances carrying copies of the same method,
 * which is bad for performance.
 */
Person1.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  /**
   * Without .call(this), it would throw an error, as that
   * is being interpreted as a normal function call, which
   * has no "this" keyword.
   */
  Person1.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person1.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();

// This call is possible here b'coz we linked prototypes.
mike.calcAge();

// Should contain the introduce()
console.log(mike.__proto__);

// 2 steps look up, contains the calcAge()
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person1);
console.log(mike instanceof Object);

/**
 * Setting up the correct constructor for Student
 * We have to do this because of how we have linked
 * our prototypes above.
 * Student.prototype = Object.create(Person1.prototype);
 * So for such linking, you need to have the line of code
 * below to have a proper constructor for the lowel instance.
 */
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car1 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car1.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car1.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car1.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car1.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

/**
 * Polymorphism in display below:
 * In the code above we have an accelerate method but
 * we override it down below to extend its functionality.
 */
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

class StudentClass extends PersonClass {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentClass('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

/**
 * If inheriting from a parent class that already defines
 * all you would need a child, you don't even need to have
 * a constructor in this case, as shown below. Look how pass
 * in arguments to the child.
 */
class MyTestClass extends PersonClass {
  logPersonClassProperties() {
    console.log('From my test class:', this.fullName, this.birthYear);
  }

  myPersonalProperty(property) {
    console.log(`Hey i am that property ${property}`);
  }
}

const test1 = new MyTestClass('John M', 2023);
test1.logPersonClassProperties();
test1.myPersonalProperty('😁😀😁');

/**
 * Attention 🔥
 * The above mechanism of inheritance we explored above can
 * be very problematic and dangerous in the real world when
 * we are designing software.
 */

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto1 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(PersonProto1);

/**
 * Inheritance:
 * StudentProto inherits from PersoProto1
 *
 * A little bit on prototype chain.😊
 * StudentProto prototype is now PersonProto
 */
const StudentProto = Object.create(PersonProto1);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  // BUG in video:
  // console.log(`My name is ${this.fullName} and I study ${this.course}`);

  // FIX:
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  /**
   * These fields will not be available in
   * the prototype, but only in the instances.
   */
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      // if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this; // Makes the method chainable
    }
  }

  // Only available in the class but not in instances.
  static helper() {
    console.log('Helper');
  }

  // 4) Private methods
  #approveLoan(val) {
    // _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);

// How to access the static method.
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
/**
 * To make chaining possible, in all the methods that return a property you
 * should add "return this;". so the deposit() and withdraw() need to have
 * than line of code, otherwise it would return an error b'coz they will be
 * undefined if not for that line of code.
 */
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
