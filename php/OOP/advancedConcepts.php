<?php

// Function to print a line break
function printLineBreak() {
    echo "<br><br><br>";
}

function sectionHeading($heading) {
    echo "############# $heading ############# <br><br>";
}


/**
 * TRAITS, NAME SPACES, DEPENDENCY INJECTION(DI)
 * AND DESIGN PATTERNS(Introuduction).
*/

sectionHeading("Traits");

//1. Traits
/**
 * Traits are mechanisms for code reuse in PHP. They allow you
 * to group methods to be used across different classes without
 * the need for inheritance.
 * 
 * Traits are particularly useful when you need to include common 
 * functionality in classes that do not share a common ancestor.
 * 
 * Traits solve a problem of multiple inheritance by allowing a class
 * to use methods from multiple traits.
*/

// example 01:
trait LoggerTrait {
    public function log($message){
        echo "Logging message: $message <br>";
    }
}

trait DatabaseTrait {
    public function connect(){
        echo "Connectiong to database ...";
    }
}

class User {
    use LoggerTrait, DatabaseTrait;

    public function createUser(){
        $this->log("User created!");
        $this->connect();
    }
}

$user = new User();
$user->createUser();
printLineBreak();

//example 02: 
/**
 * Traits can also define properties, and these properties
 * can be used within the class that uses the trait
*/
trait Configurable {
    public $config = [];

    public function setConfig(array $config){
        $this->config = $config;
    }

    public function getConfig(){
        return $this->config;
    }
}

class Application {
    use Configurable;

    public function run(){
        echo "App config: " . json_encode($this->getConfig());
    }
}

$app = new Application();
$app->setConfig(['debug' => true, 'version' => '1.0']);
$app->run();
printLineBreak();

// Example 03:
/**
 * Traits can be used in a parent class and automatically inherited by the subclass.
*/
trait Timestamp {
    public function createdAt(){
        return date('Y-m-d H:i:s');
    }
}

class Post {
    use Timestamp;
}

class Comment extends Post {
    public function postComment(){
        echo "Comment creted at: ". $this->createdAt();
    }
}

$comment = new Comment();
$comment->postComment();
printLineBreak();

// Example 04:
/**
 * When a class uses traits and overrides a method that exists in the trait, 
 * the class's method will take precedence.
*/
trait Greeter {
    public function greet(){
        echo "Hello from trait <br>";
    }
}

class Person {
    use Greeter;

    public function greet(){
        echo "Hello from person class!";
    }
}

$person = new Person();
$person->greet();  // Outputs: Hello from the Person class!
printLineBreak();

// Example 05: Resolving conflicts.
/**
 * If two traits have methods with the same name, you can resolve 
 * the conflict by aliasing or instructing PHP which method to use.
*/
trait TraitA {
    public function method() {
        echo "Method from TraitA <br>";
    }
}

trait TraitB {
    public function method() {
        echo "Method from TraitB";
    }
}

class MyClass {
    use TraitA, TraitB {
        TraitA::method insteadof TraitB;  // Use TraitA's method
        TraitB::method as methodB;  // Alias TraitB's method
    }
}

$object = new MyClass();
$object->method();   // Outputs: Method from TraitA
$object->methodB();  // Outputs: Method from TraitB
printLineBreak();


sectionHeading("Namespaces");

//2. Namespaces
/**
 * Namespaces is the way of arranging code into logical groups
 * to avoid name collisions between classes, functions, or constants.
*/

/*
// File: src/Utilities/Logger.php
namespace Utilities;

class Logger {
    public function log($message) {
        echo "Logging: $message";
    }
}

// File: src/App/Main.php
namespace App;

use Utilities\Logger;  // Import the Logger class from the Utilities namespace

class Main {
    public function run() {
        $logger = new Logger();
        $logger->log("Application started");
    }
}

$main = new Main();
$main->run();
// Outputs: Logging: Application started

*/

sectionHeading("Dependency injection");
// 3. Dependecy injection.
/**
 * Dependency Injection (DI) is a design pattern that deals with 
 * how objects or dependencies are provided to a class, instead of 
 * the class creating the dependency itself. 
 * 
 * Key Points:
 *  ->Constructor Injection: Dependencies are passed through the constructor.
 *  ->Setter Injection: Dependencies are provided through setter methods. 
*/

// Example 01: Constructor injection.
class Database {
    public function connect(){
        echo "Connection to database ...<br>";
    }
}

class UserService {
    protected $db;

    public function __construct(Database $db){
        $this->db = $db;
    }

    public function createUser(){
        $this->db->connect();
        echo "User created";
    }
}

$db = new Database();
$user1 = new UserService($db);
$user1->createUser();
printLineBreak();

// Example 02: Setter injection.
class LoggerClass {
    public function log($message){
        echo "Logging message: $message <br>";
    }
}

class UserService2 {
    protected $logger;

    // Injecting dependecy through setter
    public function setLogger(LoggerClass $logger){
        $this->logger = $logger;
    }

    public function createUser(){
        $this->logger->log("User created 😀");
    }
}

$logger = new LoggerClass();
$user2 = new UserService2();
$user2->setLogger($logger);
$user2->createUser();
printLineBreak();

// Example 03: Multiple dependency injection.
class Database3 {
    public function connect(){
        echo "Connecting to the database ... <br>";
    }
}

class Logger3 {
    public function log($message){
        echo "Logging message: $message!";
    }
}

class UserService3 {
    protected $db;
    protected $logger;

    public function __construct(Database3 $db, Logger3 $logger){
        $this->db = $db;
        $this->logger = $logger;
    }

    public function createUser(){
        $this->db->connect();
        $this->logger->log("User created 😎");
    }
}

$db3 = new Database3();
$logger3 = new Logger3();
$user3 = new UserService3($db3, $logger3); // Multiple injection
$user3->createUser();
printLineBreak();

sectionHeading('Design patterns.');
// 4. Design patterns (Singleton, Factory, MVC).
/**
 * Design patterns are typical solutions to common problems in software 
 * design. They are proven best practices that can be reused to solve recurring 
 * design problems.
*/

// 4.1 Singleton
/**
 * The singleton pattern ensures that a class has only one instance and
 * provides a global point of access to that instance.
 * 
 * In a multi-threaded environment, the singleton pattern should ensure that 
 * only one instance of the class is created, even if multiple threads attempt 
 * to create an instance simultaneously.
*/

class Singleton {
    private static $instance = null;

    private function __construct() {}

    // static method to get the single instance
    public static function getInstance(){
        if (self::$instance === null){
            self::$instance = new Singleton();
        }
        return self::$instance;
    }

    public function sayHello(){
        echo "Hello from the Singleton 😉";
    }
}

$singleton = Singleton::getInstance();
$singleton->sayHello();
printLineBreak();


// 4.2 Factory patter
/**
 * The Factory Pattern provides a way to create objects without 
 * specifying the exact class of the object that will be created. 
 * It abstracts the object creation process.
*/

class Car {
    public function drive() {
        echo "Driving a car 🚖 <br>";
    }
}

class Bike {
    public function ride() {
        echo "Riding a bike 🚲";
    }
}

class VehicleFactory {
    public static function createVehicle($type) {
        if ($type === 'car') {
            return new Car();
        } elseif ($type === 'bike') {
            return new Bike();
        }
        return null;
    }
}

// Using the factory to create a vehicle
$car = VehicleFactory::createVehicle('car');
$car->drive();  // Outputs: Driving a car

$bike = VehicleFactory::createVehicle('bike');
$bike->ride();  // Outputs: Riding a bike
printLineBreak();

sectionHeading("MVC");
// 4.3 MVC
/**
 * The Model-View-Controller (MVC) Pattern is a software architectural 
 * pattern that separates an application into three main components:
 *  -> Model: Manages the data and business logic.
 *  -> View: Handles the user interface and presentation.
 *  -> Controller: Handles input and updates the model or view.
 * 
 * MVC is widely used in frameworks like Laravel to separate concerns 
 * and make code more maintainable.
*/