/**
 * Important 🔥🔥🔥
 * These are exercises from codewars. This is PHP
 * implementation of an already implemented Javas
 * cript solution, So the question details if at all
 * needed are in the javascript folder. 
 * 👉Javascript/Codewars.
 */

// Task 02: Digital root

void main() {
    print(digitalRoot(4333));
    print(digitalRootWhileLoop(4333));
    print(digitalRootMathFormula(4333));
}

// 1. My approach
int digitalRoot(int number){
     if (number < 10) {
    return number;
  }
  
  int sum = number.toString().split('').map(int.parse).reduce((a, b) => a + b); 
  return digitalRoot(sum); 
}


// 2. Alternative O1
int digitalRootWhileLoop(int number){
   int sum = number;

  while (sum >= 10) {
    sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b); 
  }

  return sum; 
}

// 3. Alternative 02
int digitalRootMathFormula( int number){
    return (number - 1) % 9 + 1;
}