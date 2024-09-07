'use strict';
/*
const Person = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;

    // You can define a method within a constructor function like the one below
    // But this is a very bad practice. eg. If you would've to create
    // 1000 instances of this constructor function(object), each instance
    // would be carrying around the calcAge method and that is actually really bad
    // for performance

    // Never do this, use prototypal inheritance instead
    // this.calcAge = function(){
    //     console.log(2037 - this.birthYear)
    // }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas);
const alphie = new Person('Alpha', 2011);
const joe = new Person('Joe', 1993);

// Testing to see if an instance belongs to a certain object
console.log(jonas instanceof Person);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear)
}

jonas.calcAge();

// Showing prototype properties 
console.log('proto:',jonas.__proto__);

// Methods to confirm object instances(constructor function) prototypes
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas)); // True
console.log(Person.prototype.isPrototypeOf(Person)); // False

// Properties through prototypes

Person.prototype.species = 'Homo Sapiens';

console.log(jonas);

// You can access that property via jonas instance

console.log(jonas.species);

// properties and methods defined via Constructor.prototype are not directly
// available in the object(constructor) instance
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

console.log('proto:',jonas.__proto__);
console.log('proto.proto:',jonas.__proto__.__proto__);
console.log('proto.proto.proto:',jonas.__proto__.__proto__.__proto__);

// Viewing array prototype
const arr = [1, 2, 4, 5, 9];

// Let's see the arr prototype
console.log('arr prototype:', arr.__proto__);

// All objects instances created from a certain object, they all have the same
// prototype to that of the object
console.log('arr prototype equal Array object prototype?', arr.__proto__ === Array.prototype);

// CODING CHALLENGE
const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} moving at ${this.speed}`);
}

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} decelerated by ${this.speed}`);
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();

*/

// ES6 CLASSES

// There are two ways to go about it

// 1. class expression 
// const class = Person{}

// 2. class declaration
// class Person{}

class PersonClass{
    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    calcAge(){
        console.log(2037 - this.birthYear);
    }

    // Getter
    get age(){
        return 2037 - this.birthYear;
    }


}

const alphie = new PersonClass('Alpha', 1996);
alphie.calcAge();

// Getters and Setters

const account = {
    owner: 'Alphax',
    movements: [1200, 2000, 5021, 4533, 100, 10000],

    // getter --> defined by starting with the word get
    get latest(){
        return this.movements.slice(-1).pop();
    },

    // Setter --> starts with the word set, and passes only 1 argument
    set latest(mov){
        this.movements.push(mov);
    }
};

// Notice how we call the getters and setters, we call them as properties instead
// of methods

console.log(account.latest);

account.latest = 50;
console.log(account.movements);


// class PersonClass2{
//     constructor(fullName, birthYear){
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     calcAge(){
//         console.log(2037 - this.birthYear);
//     }

//     // Getter
//     get age(){
//         return 2037 - this.birthYear;
//     }

//     // Setter... Its a conventio if you're trying to set a property name that alre
//     // ady exists, we use an underscore
//     set fullName(name){
//         console.log('Name from setter scope:', name);
//         if (name.includes(' ')) this._fullName = name;
//         //else alert(`${name} is not a full name`);
//     }

//     // To get fullName you have to define another getter for that
//     // NB:before writing the following code, you couldn't access
//     // the fullName anymore as you would before defing the setter
//     // set fullName(name) above
    
//     get fullName(){
//         return this._fullName;
//     }

//     // Static method

//     static hey(){
//         console.log('Hey there 😊');
//         console.log(this);
//     }
// }

// const john = new PersonClass2('John', 1981);
// console.log(john);

// const sarah = new PersonClass2('Sarah Wiley', 1975);
// console.log(sarah);

// PersonClass2.hey();

// STATIC METHODS - These are methods available on constructors but not its proto
// types eg. Array.from(); is only available on the Array constructor and not the
// its prototype. So you cannot do this [1,2,5].from() its show in the example abo
// ve.

// A third way of implementing OOP in JS apart from prototypal inheritance and cla
// sses, it's called Object.create();

const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
}

const steven = Object.create(PersonProto);
console.log(steven); // An empty object for now

// This is not a good way of introducing object properties
// Instead create function that will specify the properties
// In this case in the above code we will create the init()
// Remember you can name it whatever you want and that functio
// n is not a constructor function cuz we are not calling the new
// keyword, it's just a function.
steven.name = 'Steven';
steven.birthYear = 2022;
steven.calcAge();

// Now create the new object with the init method just defined
const sarae = Object.create(PersonProto);
sarae.init('Sarah', 1931);
sarae.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);


// CODING CHALLENGE
// class  Car {
//     constructor(make, speed){
//         this.make = make;
//         this.speed = speed;
//     }

//     accelerate (){
//         this.speed += 10;
//         console.log(`${this.make} moving at ${this.speed}`);
//     }

//     brake (){
//         this.speed -= 5;
//         console.log(`${this.make} decelerated to ${this.speed}`);
//     }

//     get speedUS(){
//         console.log(`Speed in the USA is ${this.speed/1.6}mi/h`);
//     }

//     set speedUS(speedUSA){
//         this.speed = speedUSA * 1.6;
//     }

// }
// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);


// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.speedUS;

// bmw.speedUS = 130;
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.speedUS;

// INHERITANCE IMPLEMENTATION
// 1stly using prototypal inheritance

const User = function(userName, password){
    this.userName = userName;
    this.password = password;
}

User.prototype.greet = function(){
    console.log(`Hello ${this.userName} 🤗`);
}

const Admin = function(userName, password, role){
    User.call(this, userName, password);
    this.role = role;
}

// Right after declaring the Admin constructor inheriting from User, At this stage
// is where we should link the prototypes to enable the Admin to use the User methods

Admin.prototype = Object.create(User.prototype);

Admin.prototype.introduce = function(){
    console.log(`My name is ${this.userName} and i am a system ${this.role}`);
};

const jude = new Admin('Jude', 1245, 'admin');
jude.introduce();

// After linking the prototypes, call this method becomes possible
jude.greet();
console.log(jude.__proto__);

// This should point to Admin but as of now it's pointing to User. We need to correct that bcuz
// sometimes we need to rely on this
console.dir(Admin.prototype.constructor)

// This is a way to correct it, it should now point to Admin 
Admin.prototype.constructor = Admin;
console.dir(Admin.prototype.constructor)

console.log(jude.__proto__);


// CODING CHALLENGE
const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed += 10;
    this.charge -= 1;
    console.log(`${this.make} moving at ${this.speed} with a charge of ${this.charge}%`);
}

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} decelerated by ${this.speed}`);
}

const EV = function(make, speed, charge){
    Car.call(this, make, speed);
    this.charge = charge;
}

// Link the prototypes to have access to the Car methods
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}

// Notice how we have two accelerate methods, one in the Car prototype and another in EV
// The one first in prototype chain i.e EV accelerate method will be invoked when we call
// accelerate method(method override - Polymorphism)
EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} moving at ${this.speed} with a charge of ${this.charge}%`);
}


const tesla = new EV('Tesla', 120, 22);

tesla.accelerate();
tesla.accelerate();
tesla.chargeBattery(90);
tesla.accelerate();
tesla.accelerate();
tesla.brake();


// INHERITANCE USING ES6 CLASSES

class PersonClass2{
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge(){
        console.log(2037 - this.birthYear);
    }

    // Getter
    get age(){
        return 2037 - this.birthYear;
    }

    // Setter... Its a conventio if you're trying to set a property name that alre
    // ady exists, we use an underscore
    set fullName(name){
        console.log('Name from setter scope:', name);
        if (name.includes(' ')) this._fullName = name;
        //else alert(`${name} is not a full name`);
    }

    get fullName(){
        return this._fullName;
    }

    // Static method

    static hey(){
        console.log('Hey there 😊');
        console.log(this);
    }
}

class Student extends PersonClass2{
    constructor(fullName, birthYear, course){
        super(fullName, birthYear);
        this.course = course;
    }

    introduce(){
        console.log(`My name is ${this.fullName} and i major in ${this.course}`);
    }

    // Let's override one of the parent method

    calcAge(){
        console.log(`You are ${2037 - this.birthYear} years old 💯`)
    }
}

const doe = new Student('John Doe', 1978, 'Computer Science');

console.log(doe);
doe.introduce();
doe.calcAge();

// INHERITANCE BY USING Object.create()
const PersonProto2 = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
}

const StudentProto = Object.create(PersonProto2);

StudentProto.init = function(firstName, birthYear, course){
    // Inheriting from parent class init method
    PersonProto2.init.call(this, firstName, birthYear);
    this.course = course;
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Engineering')
jay.calcAge();
console.log(jay);

// MORE ON CLASSES
// class Account {
//     constructor(owner, currency, pin){
//         this.owner = owner;
//         this.currency = currency;

//         // There isn't a way to implement privacy to properties just yet, but 
//         // there is a convention used by developers, However that doesn't mean
//         // that such properties are not accessible but rather serve as indicator
//         // to fellow developers in a team. The convention is an underscore as used below
//         this._pin = pin;

//         // You can also create properties that do not receive any input
//         this._movements = [];
//         this.locale = navigator.language;

//         // You can even do computation
//         console.log(`Thank you for opening an account, ${this.owner}`);
//     }

//     // Public API 
//     getMovements(){
//         return this._movements;
//     }

//     deposit(val){
//         this._movements.push(val);
//     }

//     withdraw(val){
//         this.deposit(-val); // Negative implies that we have withdrawn money(movement)
//     }

//     // Privacy to methods
//     _approveLoan(val){
//         return true;
//     }

//     requesLoan(val){
//         if(this._approveLoan(val)){
//             this.deposit(val);
//             console.log('Loan approved');
//         }
//     }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1.deposit(200);
// acc1.withdraw(500);
// acc1.requesLoan(1000);
// console.log(acc1.getMovements());
// console.log(acc1);

// Class fields (A new proposal in JS)
// 1. Public fields
// 2. Public methods
// 3. Private field;
// 4. Private methods

// There is also a static version of all the above implementations

class Account {
    // Public fields (These fields will be in the instances we create and not prototype)
    locale = navigator.language;

    // Private fields
    #movements = [];
    #pin; // This is how we define private fields for values expecting an input

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        //this._movements = [];
        //this.locale = navigator.language;

    }

    // 3. Public methods

    // Public API
    getMovements(){
        return this.#movements;
    }

    // NB: All methods that set a value need to return something i.e this
    // So as to make methods chaining possible 
    deposit(val){
        this.#movements.push(val);
        return this;
    }

    withdraw(val){
        this.deposit(-val); 
        return this;
    }

    requesLoan(val){
        if(this._approveLoan(val)){
            this.deposit(val);
            console.log('Loan approved');
            return this;
        }
    }

    // 4. Private methods
    // Not yet implemented in browsers
    // #approveLoan(val){
    //     return true;
    // }

    _approveLoan(val){
        return true;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(200);
acc1.withdraw(500);
acc1.requesLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);

// Chaining
acc1
    .deposit(4000)
    .deposit(2300)
    .withdraw(500)
    .requesLoan(3200)
    .withdraw(1100);

console.log(acc1.getMovements());


// CODING CHALLENGE

class Car1 {
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }

    accelerate(){
        this.speed += 10;
        this.charge -= 1;
        console.log(`${this.make} moving at ${this.speed} with a charge of ${this.charge}%`);
    }

    brake(){
        this.speed -= 5;
        console.log(`${this.make} decelerated to ${this.speed}`);
        return this;
    }
    
}

class EV1 extends Car1 {
    #charge;

    constructor(make, speed, charge){
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo;
        return this;
    }

    // Let's do some overriding
    accelerate(){
        this.speed += 20;
        this.charge--;
        console.log(`${this.make} moving at ${this.speed} with a charge of ${this.#charge}%`);
        return this;
    }
}


const tesla1 = new EV1('Tesla', 120, 22);
console.log(tesla1)

// Chaining methods

tesla1
    .accelerate()
    .chargeBattery(80)
    .accelerate()
    .brake()
    .brake();

