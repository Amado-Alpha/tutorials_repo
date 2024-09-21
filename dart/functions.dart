void main() {

    myFunc(){
        print('Functions in dart! 😎');
    }

    myFunc();

    myFuncReturn(){
        return 'Returned function 😯';
    }

    print(myFuncReturn());

    var funcVariable = myFuncReturn();
    print('Function in variable: $funcVariable');

    // Function with arguments
    callMyName(String name){
        print('Hey $name, such a nice name you have!');
    }

    callMyName("Alpha");

    // Positional parameter
    positionalParameter(String firstName, [surName]){
        return "Hello $firstName $surName";
    }

    print('Positional parameter ${positionalParameter('Alpha')}'); // returns null for surName

    // Named parameter
    namedParameter(String firstName, {surName}){
        return "Hello $firstName $surName";
    }

    print('Named parameter ${namedParameter('Alpha', surName:"Amado")}');
    
    // default parameter
    defaultParameter(String firstName, {surName = "Default"}){
        return "Hello $firstName $surName";
    }

    print('Named parameter ${defaultParameter('Alpha')}');
}


