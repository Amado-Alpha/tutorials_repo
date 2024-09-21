/**
 * Important 🔥🔥🔥
 * These are exercises from codewars. This is PHP
 * implementation of an already implemented Javas
 * cript solution, So the question details if at all
 * needed are in the javascript folder. 
 * 👉Javascript/Codewars.
 */

void main() {

    print(digitalRoot(987));
    print(digitalRootWhileLoop(987));
    print(digitalRootMathFormula(987));
    
}

// Task 01: Digital root

// 1. My approach
int digitalRoot(int num){
    if (num < 10){
        return num;
    }
    
    int sum = num.toString().split('').map(int.parse).reduce((a, b) => a + b);
    return digitalRoot(sum);
}

// 2. Alternative 01
int digitalRootWhileLoop(num){
    int sum = num;

    while (sum > 9){
        sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b);
    }
    
    return sum;
}

// 3. Alternative 02
int digitalRootMathFormula(int num){
    return (num - 1) % 9 + 1;
}


