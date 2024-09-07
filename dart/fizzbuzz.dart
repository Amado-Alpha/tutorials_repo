void main(){

    /* 
       Printing out numbers in certain range, if a number is divisible
       by 3 print fizz, if divisible by 5, buzz, if both, print fizzbuzz
       if not divisible by any, just print a number.
    */

    var num = 1;

    while(num <= 100){
        if (num % 5 == 0 && num % 3 == 0){
            print('$num. fizzbuzz');

        }else if (num % 3 == 0){
            print('$num. fizz');

        }else if (num % 5 == 0){
            print('$num. buzz');
        }else {
            print(num);
        }

        num++;
    }
}