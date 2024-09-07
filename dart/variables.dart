void main(){

    // Strings
    var name = 'John';
    String name = 'John';

    // integers
    var x = 20;
    int x = 20;


    // dynamic

    /* 
        It's used when the type of value is unknown or
        can vary during execution.

        While dynamic can be convenient, Dart's strong 
        type system encourages the use of specific types 
        like int, String, or List, which offer better safety 
        and performance at compile time.
    */
    dynamic firstName = 'Alpha';

    // const and final
    
    /*
        They are both used for values that can't be modified but
        they have a little distinction in how they work.

        final is a runtime constant while const is a compile time
        constant. By this i mean we use final for the values that
        will be known at run time (At time.)

        We use const for the values that should be known at compile
        time (Ahead of time).
    */

    // final
    final currentTime = DateTime.now();
    print(currentTime);

    currentTime = DateTime.now(); // Error: A final variable can only be set once.

    // const
    const pi = 3.14159;
    print(pi);

    pi = 3.14; // Error: constant variables can't be assigned a value.

    // Declaring and not using
    var myName;
    print(myNmae); // null

    myName = 'Alpha';
    print(myName); // Alpha

}