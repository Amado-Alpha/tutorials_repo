<?php
// Function to print a line break
function printLineBreak() {
    echo "<br><br><br>";
}

/**
 * Important 🔥🔥🔥
 * These are exercises from codewars. This is PHP
 * implementation of an already implemented Javas
 * cript solution, So the question details if at all
 * needed are in the javascript folder. 
 * 👉Javascript/Codewars.
 */

// Task 02: Digital root

// 1. My approach
function digitalRoot($number){
    if ($number < 10){
        return $number;
    } else {
        $sum = array_sum(str_split($number));
        return digitalRoot($sum);
    }
}
echo digitalRoot(48477474);

// 2. Alternative O1
function digitalRootWhileLoop($number){
    $sum = $number;
    while ($sum > 9){
        $sum = array_sum(str_split($number));
    }
    return $sum;
}

// 3. Alternative 02
function digitalRootMathFormula($number){
    return ($number - 1) % 9 + 1;
}