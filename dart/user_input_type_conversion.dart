import 'dart:io';

void main(){

    print('Enter a number');

    var userNumber = stdin.readLineSync(); 

    // user input always comes in as a string so we have to parse it

    /* 
        We check for nullability "??" in the case of user input, because
        sometimes a user might not enter anything when prompted.

        ALTERNATIVE OPTION TO ELIMINATE ALL ERRORS
        // Check for null or empty input and assign '0' if no valid input is provided
        var total = 40 + int.parse(userNumber?.isEmpty ?? true ? '0' : userNumber!);

        The ! operator in Dart is called the null assertion operator. It tells the 
        compiler that you're sure the value is not null at this point in the code. 
        Using it means you're asserting that the variable will never be null, and if 
        it is, it will cause a runtime error.

    */
    // var total = 40 + int.parse(userNumber ?? '0' );

    var total = 40 + int.parse(userNumber?.isEmpty ?? true ? '0'  : userNumber!);

    print('Total is $total');

    /* 
        QUICK SCHOOL: ?? vs ?

        ?? is called Null-Coalescing operator: It provides a default value
           when an expression evaluates to null.
           
           eg. var result = someValue ?? defaultValue;

        ? is called Null-Aware operator and conditional property access:
        
          (i) Null-Aware operator.
            It allows you to access properties or methods of an object that mi
            ght be null. If the object is null, the expression returns null wit
            hout throwing an error.

            object?.property;
            object?.method;

            eg. String name;
                print(name?.length); prints null instead of throwing an error.

        (ii) Conditional operator (Ternary operator)

            condition ? valueIfTrue : valueIfFalse;

    */
}