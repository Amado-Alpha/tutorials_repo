<?php

// Function to print a line break
function printLineBreak() {
    echo "<br><br><br>";
};

/**
 * 
 *  INTRODUCTION TO OOP IN PHP
 */

// PART 01: OOP OVERVIEWS

// 1. Methods and properties

class Car {

    // Properties (variables)
    public $make;
    public $model;

    // Method ( function)
    public function drive(){
        echo "I'm driving a ". $this->make. ' ' . $this->model;
    }
};

$car1 = new Car();
$car1->make = "Nisaan";
$car1->model = "X-trail";
$car1->drive();
printLineBreak();


// 2. Constructors and Destructors.

/**
 * The constructor method __construct() is called when
 * an object is created, It is usually used to initialize
 * properties.
 * 
 * The deconstructor method __deconstruct() is called when
 * an object is desctroyed or scripts ends.
 */

 class Computer {

    public $brand;
    public $model;

    // Constructor to initialize properties
    public function __construct($brand, $model){
        $this->brand = $brand;
        $this->model = $model;
    }

    // Method to display computer details
    public function displayDetails(){
        echo "This is ". $this->brand . " " . $this->model;
    }

    // Desctructor

    /**
     * This concept isn't used much in real world
     * scenario
     */
    public function __desctructor(){
        echo "Object destroyed";
    }
}

$myComputer = new Computer("HP", "54GHR");
$myComputer->displayDetails();
printLineBreak();


// PART 02: ENCAPSULATION

/**
 * Encapsulation is the key OOP principle that restricts
 * direct access to an object and allows it to be modifie
 * d only through defined methods.
 */

// 1. Visibility modifiers: public, private and protected properties.

class User {
    public $username;
    private $password;

    public function __construct($username, $password){
        $this->username = $username;
        $this->password = $password;
    }

    // public method to set password
    public function setPassword($password){
        $this->password = $password;
    }

    // public method to retrieve password
    public function getPassword(){
        return "Password is protected";
    }

    // private method accessible within only the class
    private function validatePassword(){
        return strlen($this->password) >= 8;
    }
}

$user = new User("Alphax", "password123");

// Accessing public property
echo $user->username;
printLineBreak();

// Setting new password
$user->setPassword("Newpassword");
echo $user->getPassword();
printLineBreak();

// 2. Deeper perspective into private and protected
// (i) private
/**
 * private properties and methods are only accessible within the 
 * class from which they defined, their visibility is hidden even
 * to child classes that inherit from the parent in which they are
 * defined.
 * 
 * Real world usage
 * (a) Sensitive data: Bank accounts, passwords and personal user info.
 * (b) Internal logic: Methods that perform calculations and validations
 *     that should not be exposed to outside code.
 */

 class BankAccount{
    private $balance;

    public function __construct($initialBalance){
        $this->balance = $initialBalance;
    }

    // public method to deposit money
    public function deposit($amount){
        if ($amount > 0){
            $this->balance += $amount;
            echo "Deposited $amount. New balance is " . $this->getBalance();
        }else{
            echo "Invalid amount";
        }
    }

    // public method to withdraw money (with validation)
    public function withdraw($amount){
        if ($this->validateAmount($amount)){
            $this->balance -= $amount;
            echo "Withdraw $amount. New balance is " . $this->getBalance();
        }else{
            echo "Invalid withdraw amount";
        }
    }

    // private method to validate amount
    private function validateAmount($amount){
        return $amount > 0 && $amount <= $this->balance;
    }

    // private method to get balance
    private function getBalance(){
        return $this->balance;
    }
}

$account = new BankAccount(1000);

$account->deposit(500);
printLineBreak();
$account->withdraw(500);
printLineBreak();
 
// (ii) protected
/**
 * Protected properties and methods can be accessed from within 
 * the class and by inheriting (child) classes, but not from 
 * outside the class. This provides more flexibility than private, 
 * but still protects the data from external access.
 * 
 * Real world use cases:
 * (a) class hierarchies: Having base class with general logic but
 *     wanting child classes to access or override that logic.
 *     eg. bonus calculation.
 * (b) Data shared between family of classes.
 * 
 */

class Employee {
    protected $salary;

    public function __construct($salary){
        $this->salary = $salary;
    }

    // protected method to calculate bonus (Accessible to child classes)
    protected function calculateBonus(){
        return $this->salary * 0.1; // Bonus is 10% of the salary
    }

    // public method to get salary
    public function getSalary(){
        return $this->salary;
    }
}

class Manager extends Employee {
    private $bonus; // private property for manager-specific bonus

    public function __construct($salary){
        parent::__construct($salary);
        $this->bonus = $this->calculateBonus();
    }

    // public method to get Manager's total earnings
    public function getTotalEarnings(){
        return $this->salary + $this->bonus;
    }
}

// Create a Manager object
$manager = new Manager(5000);
echo "Manager's salary: " . $manager->getSalary(); // Outputs: 5000
printLineBreak();
echo "Manager's total earnings (with bonus): " . $manager->getTotalEarnings(); // Outputs: 5500
printLineBreak();

// PART 03: STATIC PROPERTIES AND METHODS
// (i) Static properties
/**
 * Static properties and methods belong to the class itself rather than
 * any specific object of a class.
 * 
 * You don't need to create an instance of a class to access them, instead
 * you can access them using the class name directly.
 * 
 * Static properties are shared across all instances of a class, this means
 * If you change a static property in one instance, the change will be refle
 * cted across all instances.
 * 
 * HOW TO DECLARE AND USE
 *      Use the static keyword to declare a static property or method.
 *      Access static properties or methods using ClassName::property or ClassName::method()
 * 
 * REAL WORLD USE CASES
 *      Counters: You might want to keep track of how many instances of a class have been 
 *      created (like tracking user registrations).
 *      Configuration values: Static properties can hold values that are 
 *      shared across all instances, like API keys or configuration settings.
*/

class Product {
    public static $productCount;

    // Incrementing product count when a product is created
    public function __construct(){
        self::$productCount++;
    }

    // static function to get user count
    public static function getProductCount(){
        return self::$productCount;
    }
}

$product1 = new Product();
$product2 = new Product();

echo "Total products are " . Product::getProductCount();
printLineBreak();

// (ii) Static methods.
/**
 * Static methods belong to the class itself not its instances.
 * They can only operate on static properties or perform operatio
 * ns that do not depend on instance data.
*/

class MathHelper{

    public static function calculateCircleArea($radius){
        return pi() * $radius * $radius;
    }

    public static function calculateRectangleArea($width, $length){
        return $width * $length;
    }
}

echo "The area of circle is " . MathHelper::calculateCircleArea(7);
printLineBreak();
echo "The area of rectangle is " . MathHelper::calculateRectangleArea(4, 3);
printLineBreak();

/**
 * When to use static properties and methods
 * Static properties are useful when you want a value to 
 * be shared among instanses of a class, such as counters
 * or confifguration settings
 * 
 * Static methods are useful for utility functions that don't
 * require access to instances of a class. eg. math calculations,
 * date formatting and helper functions.
 * 
 */

 // Real world example
 class Config {
    public static $settings = [];

    public static function set($key, $value){
        self::$settings[$key] = $value;    
    }

    // Static method to get a configuration value
    public static function get($key){
        return self::$settings[$key] ?? null;
    }
}

Config::set('Database', 'mysql');
Config::set('Host', 'localhost');

// Get configuration values
echo Config::get('Database'); // Output mysql
printLineBreak();
echo Config::get('Host'); // Output localhost
printLineBreak();


// (iii) "this" and "self" keywords
/**
 * self:: is used to reference static properties 
 * and methods within the same class.
 * $this-> is used to reference instance properties and methods 
 * for the specific object being worked with.
*/

class Example {
    public static $staticVar = "I'm static!";
    public $instanceVar = "I'm an instance variable!";

    // Static method
    public static function staticMethod() {
        echo self::$staticVar; // Access static property
    }

    // Instance method
    public function instanceMethod() {
        echo $this->instanceVar; // Access instance property
    }
}

// Accessing static method
Example::staticMethod(); // Outputs: I'm static!
printLineBreak();
// Creating an instance to access instance method
$instance = new Example();
$instance->instanceMethod(); // Outputs: I'm an instance variable!
printLineBreak();




