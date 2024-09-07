<?php

// Function to print a line break
function printLineBreak() {
    echo "<br><br><br>";
}

// Basic function
function welcome(){
    echo "Welcome to my php class";
}

welcome();
printLineBreak();

// function with argument
function greet($name){
    echo "Hello ".  $name  ."!";
}

greet("Alpha");
printLineBreak();


// default parameter
function  defaultParameter($name = 'Jane'){
    echo "Hello ". $name . "!";
}

defaultParameter();
printLineBreak();
defaultParameter('Ange');
printLineBreak();

// Local variable
function localVariable(){
    $localVar = "Hey i'm a local variable.";
    echo $localVar;
}

localVariable();
printLineBreak();


// Global variable
$globalVar = "I'm global variable";

function globalVariable(){
    /* 
        This is a way to access the global variable otherwise
        it will throw an error

        Alternative: Using globals array
        echo $GLOBALS['globalVar']; 
    */
    global $globalVar; 
    echo $globalVar;
}

globalVariable();
printLineBreak();


// ADVANCED FUNCTIONS

// 1. Variable length arguments list

function variableLengthArgs(...$numbers){
    $sum = 0;
    foreach ($numbers as  $number){
        $sum += $number;
    }
    echo $sum;
}

variableLengthArgs(1,2,3);
printLineBreak();
variableLengthArgs(1,2,3,4,4,6);
printLineBreak();


// 2. Anonymous functions
$square = function($n){
    return $n * $n;
};

echo $square(5);
printLineBreak();

// Anonymous functions use cases 
/*
Generally speaking anonymous functions are used when 
you want to define a function on the fly for one-off
operations. Simply if you don't have an intention of 
reusing the function over and over again.
*/

// (i) Using anonymous functions as callbacks.

$numbersToDouble = [1, 2, 3, 4, 5];

$doubled = array_map(function($num){
    return $num * 2;
}, $numbersToDouble);

print_r($doubled);
// Output: Array ( [0] => 2 [1] => 4 [2] => 6 [3] => 8 [4] => 10 )
printLineBreak();

// (ii) Closures: Capturing variables from the outer scope.
/**
 * Anonymous functions can capture variables from the sorrounding state,
 * making them powerful tool when you want to retain state.
 */

$greeting = 'Hello';

$greetAlpha = function ($name) use ($greeting){
    return $greeting . ' ' . $name;
};

echo $greetAlpha('Alpha');
printLineBreak();

// 3. Callback functions
$arrayValues = [1, 2, 3, 4, 5, 6];

function processArray($arr, $callbackFunction){
    foreach($arr as $arrayItem){
        echo $callbackFunction($arrayItem) . "<br>"; // on terminal "\n" works for new line.
    }
};

function doubleArrayItems($num){
    return $num * 2;
};

processArray($arrayValues, 'doubleArrayItems');
printLineBreak();


// 4. Recursive functions - Self calling functions.

function factorial($number){
    if($number <= 1){
        return 1;
    };
    return $number * factorial($number - 1);
}

echo factorial(5);
printLineBreak();


// Reusable functions
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

$email = "example@example";
if (isValidEmail($email)) {
    echo "$email is valid.";
} else {
    echo "$email is not valid.";
}

printLineBreak();

/**
 * The concept of side effects.
 * Side effect refers to changes in the state of a system or environm
 * ent that occurs as result of executing a function or expression.
 * 
 * Alternatively is any observable effect of a function or expression 
 * beyond its return value.
 * 
 * 😊 Suppose a function's effect on execution is expected to turn on 
 *     the lights, If it will switch on the AC too, that would be its sid
 *     e effect.
 */

// eg.1: Modifying the global variable.
$globalVariable = 10;

function modifyGlobal(){
    global $globalVariable;
    $globalVariable = 40;
};

modifyGlobal();
echo $globalVariable;
printLineBreak();

// eg. 2: Changing the state of an object.

class Counting{

    public $count = 0;

    public function increment(){
        $this->count++;
    }
};

$counter = new Counting();
$counter->increment();
echo $counter->count; // Outputs 1
printLineBreak();

// eg. A function with no side effect.
function add($a, $b) {
    return $a + $b;
};

